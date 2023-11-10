import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

    constructor(
        private userService:UsersService,
        private jwtService:JwtService,  
    ){}

    async signup(createUserDto: CreateUserDto):Promise<Tokens>{
      const user = await this.userService.create(createUserDto);
      if(!user) throw new HttpException(`An error occured while creating user`, HttpStatus.BAD_REQUEST)
      const tokens = await this.generateToken(user.id, user.email);
      await this.userService.updateRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    }

    async login(loginDto:LoginDto):Promise<Tokens> {
      const user = await this.userService.findUserByEmail(loginDto.email);
      if(!user) throw new HttpException(`User with email ${loginDto.email} not found`, HttpStatus.BAD_REQUEST) //throw new UnauthorizedException()
     
      const isMatch = await bcrypt.compare(loginDto.password,user.password)
      if(!isMatch) throw new HttpException(`Incorrect Password`, HttpStatus.BAD_REQUEST)

      const tokens = await this.generateToken(user.id, user.email);
      await this.userService.updateRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    }

    async logout(id: string){
       await this.userService.logoutUser(id);
       return true;
    }

    async refreshToken(id:string, refreshToken:string){
      const user = await this.userService.findOne(id);
      if(!user) throw new ForbiddenException('Access Denied');

      if(refreshToken !== user.hashRt) throw new ForbiddenException('Access Denied');

      const tokens = await this.generateToken(user.id, user.email);
      await this.userService.updateRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    }
   

    async generateToken(userId: string, email:string){
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync({
          sub:userId,
          email,
        },
        {
          secret:process.env.JWT_TOKEN_KEY,
          expiresIn:60*60*24*7, //7days
        }),
        this.jwtService.signAsync({
          sub:userId,
          email,
        },
        {
          secret:process.env.JWT_REFRESH_TOKEN_KEY,
          expiresIn:60*60*24*14,
        })
      ])

      return {
        access_token:accessToken,
        refresh_token:refreshToken
      }

      }

     



    }
      

