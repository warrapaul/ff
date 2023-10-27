import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../types';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(
    private readonly userService: UsersService,
    private readonly roleService: RolesService,

  ) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_TOKEN_KEY,
    });
  }

  async validate(payload: JwtPayload): Promise<User|undefined> {
    const user = await this.userService.findOne(payload.sub)
    if(!user) {
      throw new HttpException('invalid access token',HttpStatus.UNAUTHORIZED)//throw new UnauthorizedException();
   }


    const permissions = await this.roleService.getPermissionNamesForUser(user.id);
    const userWithPermissions = {...user, permissions}    
    return userWithPermissions;

    // return user
  }
}