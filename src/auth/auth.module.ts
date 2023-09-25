import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule, PassportSerializer } from '@nestjs/passport';
import { JwtStrategy, JwtRefreshStrategy } from './strategies';
import { RolesService } from 'src/roles/roles.service';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({}),
    PassportModule,
    UsersModule, 
    RolesModule,

  ],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
