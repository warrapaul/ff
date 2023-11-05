import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ParseUUIDPipe, UseInterceptors, ClassSerializerInterceptor, UploadedFile, ParseFilePipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminUpdateUserDto, UpdateUserProfileDto } from './dto/update-user.dto';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserSerializer } from './serializers/user.serializer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImgToFolderHelper, UploadImgToServerHelper } from 'src/common/helpers/image-upload.helper';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get('profile')
  // userProfile(@GetCurrentUser() user:User){
  //   return user;
  // }

  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  async userProfile(@GetCurrentUserId() id: string){
    const currUser= await this.usersService.userProfile(id);
    return new UserSerializer(currUser)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

 


  @Patch('update-profile/:id')
  @UseInterceptors(FileInterceptor('profilePic',UploadImgToFolderHelper))
  // @UseInterceptors(FileInterceptor('profilePic', UploadImgToServerHelper))
  updateProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
    @UploadedFile() profilePic: Express.Multer.File
    ){
      console.log(profilePic)
      return this.usersService.updateUserProfile(id, updateUserProfileDto, profilePic)
  }



  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() adminUpdateUserDto: AdminUpdateUserDto) {
    return this.usersService.update(id, adminUpdateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
