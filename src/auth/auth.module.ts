import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import {ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, JwtRefreshStrategy } from './strategies';

@Module({
  imports:[
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({}),
    UsersModule, 
    PassportModule

  ],
  providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
