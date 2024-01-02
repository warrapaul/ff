import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ParseUUIDPipe, UseInterceptors, ClassSerializerInterceptor, UploadedFile, ParseFilePipe, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetCurrentUser, GetCurrentUserId, IsPublic } from 'src/common/decorators';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserSerializer } from './serializers/user.serializer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImgToFolderHelper, UploadImgToServerHelper } from 'src/common/helpers/image-upload.helper';
import { Permissions } from 'src/common/decorators';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Permissions('CreateUsers')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Permissions('ViewUsers')
  findAll() {
    return this.usersService.findAll();
  }


  @Get('profile')
  // @UseInterceptors(ClassSerializerInterceptor)
  async userProfile(@GetCurrentUserId() id: string){
    return await this.usersService.userProfile(id);
  }



  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

 


  // @Patch('update-profile/:id')
  // @UseInterceptors(FileInterceptor('profilePic',UploadImgToFolderHelper))
  // // @UseInterceptors(FileInterceptor('profilePic', UploadImgToServerHelper))
  // updateProfile(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updateUserProfileDto: UpdateUserProfileDto,
  //   @UploadedFile() profilePic: Express.Multer.File
  //   ){
  //     console.log(profilePic)
  //     return this.usersService.updateUserProfile(id, updateUserProfileDto, profilePic)
  // }

  // TO DO: implement profile update to include images (id, profile pic)
  @Patch('profile/:id')
  updateUserProfile(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserProfileDto: UpdateUserProfileDto){
    return this.usersService.updateUserProfile(id, updateUserProfileDto);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Permissions('DeleteUsers')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
