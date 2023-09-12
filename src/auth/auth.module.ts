import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, JwtRefreshStrategy } from './strategies';
import { RoleModule } from 'src/database/seeds/role/role.module';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({}),
    UsersModule, 
    PassportModule,
    RoleModule

  ],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
