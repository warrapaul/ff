import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { GetCurrentUser, GetCurrentUserId, IsPublic } from 'src/common/decorators';
import { Tokens } from './types';
import { ApiTags } from '@nestjs/swagger';
import { RtGuard } from 'src/common/guards';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}

    @IsPublic()
    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    signup(@Body() createUserDto:CreateUserDto): Promise<Tokens>{
        return this.authService.signup(createUserDto);
    }


    @IsPublic()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto:LoginDto): Promise<Tokens>{
        return this.authService.login(loginDto);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: string){
        return this.authService.logout(userId);
    }

    @IsPublic()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(
        @GetCurrentUserId() userId: string,
        @GetCurrentUser('refreshToken') refreshToken: string,
        ){
        return this.authService.refreshToken(userId, refreshToken);
    }
    


   

}
