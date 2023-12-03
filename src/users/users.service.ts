import {  ConflictException, HttpException, HttpStatus, Injectable, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminUpdateUserDto, UpdateUserProfileDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { UserSerializer } from './serializers/user.serializer';
import { HttpService } from '@nestjs/axios';
import { MediaUtils } from 'src/utils/media.utils';
import { UserAccount } from './entities/user-account.entity';
import { UserProfile } from './entities/user-profile.entity';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserAccount)
    private readonly userAccountRepository: Repository<UserAccount>,
    @InjectRepository(UserProfile)
    private readonly userProfiletRepository: Repository<UserProfile>,

    private readonly httpService:HttpService,
    private readonly mediaUtils: MediaUtils

  ){}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findUserByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException(`User with email ${createUserDto.email} already exists.`);
    }


    const {password, ...userDto} = createUserDto;
    const salt =await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const currUser = this.userRepository.create({...userDto,password: hash});
    const savedUser= await this.userRepository.save(currUser);


    const accountNumber = '7867465352412456'

    const userAccount = this.userAccountRepository.create({
      user: currUser,
      accountNumber: accountNumber
    })
    await this.userAccountRepository.save(userAccount)

    const userProfile = this.userProfiletRepository.create({
      user: currUser
    })
    await this.userProfiletRepository.save(userProfile)

    delete savedUser.password
    return savedUser
  }


  async findAll() {
    // return await this.userRepository
    // .createQueryBuilder('user')
    // .leftJoinAndSelect('user.role','role')
    // .leftJoinAndSelect('role.permissions','permission')
    // .select(['user.id','user.name','user.email',
    //         'role.id','role.name',
    //         'permission.id','permission.name'])
    // .getMany();

    return await this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.role', 'role')
    .leftJoinAndSelect('role.permissions','permission')
    .leftJoinAndSelect('user.userProfile', 'userProfile')
    .leftJoinAndSelect('user.userAccount', 'userAccount')
    .leftJoinAndSelect('userAccount.officials', 'officials')
    .leftJoinAndSelect('userAccount.createdChamaas', 'createdChamaas')

    .select([
      'user.id',
      'user.firstName',
      'user.middleName',
      'user.lastName',
      'user.nationalId',
      'user.email',
      'user.phoneNumber',
      'user.status',

      'userProfile.gender',
      'userProfile.dob',
      'userProfile.phoneNumberSecondary',
      'userProfile.idPicFront',
      'userProfile.idPicBack',

      'userAccount.accountNumber',

      'officials.position',
      'officials.roleDescription',
      'officials.chamaa',

      'createdChamaas.chamaa',
      'createdChamaas.locationCounty',
      'createdChamaas.locationSubCounty',


      // 'user.password',
      // 'user.hash',
      'role.id',
      'role.name',
      'role.description',
      'role.isActive',

      'permission.id',
      'permission.name'
    ])
    .getMany();
  }

  async findOne(id: string) {
    // return await this.userRepository.findOne({
    //   where:{id},
    //   relations:{
    //     role: true
    //   }
    // })
    return await this.userRepository
    .createQueryBuilder('user')
    .where('user.id = :id', { id })
    .leftJoinAndSelect('user.role', 'role')
    .leftJoinAndSelect('role.permissions','permission')
    .leftJoinAndSelect('user.userProfile', 'userProfile')
    .leftJoinAndSelect('user.userAccount', 'userAccount')
    .leftJoinAndSelect('userAccount.officials', 'officials')
    .leftJoinAndSelect('userAccount.createdChamaas', 'createdChamaas')

    .select([
      'user.id',
      'user.firstName',
      'user.middleName',
      'user.lastName',
      'user.nationalId',
      'user.email',
      'user.phoneNumber',
      'user.status',

      'userProfile.gender',
      'userProfile.dob',
      'userProfile.phoneNumberSecondary',
      'userProfile.idPicFront',
      'userProfile.idPicBack',

      'userAccount.accountNumber',

      'officials.position',
      'officials.roleDescription',
      'officials.chamaa',

      'createdChamaas.chamaa',
      'createdChamaas.locationCounty',
      'createdChamaas.locationSubCounty',


      // 'user.password',
      // 'user.hash',
      'role.id',
      'role.name',
      'role.description',
      'role.isActive',

      'permission.id',
      'permission.name'
    ])
    .getOne();
  }

  async userProfile(id: string){
    return await this.userRepository
    .createQueryBuilder('user')
    .where('user.id = :id', { id })
    .leftJoinAndSelect('user.role', 'role')
    .leftJoinAndSelect('role.permissions','permission')
    .leftJoinAndSelect('user.userProfile', 'userProfile')
    .leftJoinAndSelect('user.userAccount', 'userAccount')
    .leftJoinAndSelect('userAccount.officials', 'officials')
    .leftJoinAndSelect('userAccount.createdChamaas', 'createdChamaas')

    .select([
      'user.id',
      'user.firstName',
      'user.middleName',
      'user.lastName',
      'user.nationalId',
      'user.email',
      'user.phoneNumber',
      'user.status',

      'userProfile.gender',
      'userProfile.dob',
      'userProfile.phoneNumberSecondary',
      'userProfile.idPicFront',
      'userProfile.idPicBack',

      'userAccount.accountNumber',

      'officials.position',
      'officials.roleDescription',
      'officials.chamaa',

      'createdChamaas.chamaa',
      'createdChamaas.locationCounty',
      'createdChamaas.locationSubCounty',


      // 'user.password',
      // 'user.hash',
      'role.id',
      'role.name',
      'role.description',
      'role.isActive',

      'permission.id',
      'permission.name'
    ])
    .getOne();
    
    // return await this.userRepository.findOne({
    //   where:{id},
    //   relations:{
    //     role: true,        
    //   }
    // })
    

    
  }

  async getUserAccountInfoByUserId(userId: string) {
    return await this.userAccountRepository.findOne({
      where: { user: {id: userId} },
    });
  }

  async update(id: string, adminUpdateUserDto: AdminUpdateUserDto) {
    const user = await this.userRepository.findOneBy({id});
    if(!user) {
      throw new HttpException('User not found',HttpStatus.BAD_REQUEST);
    }

    //ensure email is unique
    if (adminUpdateUserDto.email) {      
      //ensure email is unique
      const existingUser = await this.userRepository.findOne({
        where: {
          email: adminUpdateUserDto.email,
          id: Not(id),
        },
      });

      if (existingUser) {
        throw new ConflictException(`Email ${adminUpdateUserDto.email} is already in use.`);
      }

      user.email = adminUpdateUserDto.email;
    }


    //// Loop through the fields to update
    // for (const field of ['name', 'otherField', 'anotherField']) {
    //   if (adminUpdateUserDto[field]) {
    //     user[field] = adminUpdateUserDto[field];
    //   }
    // }

    if (adminUpdateUserDto.password) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(adminUpdateUserDto.password, salt);
        user.password = hash;
    }

    const updatedUser = await this.userRepository.save(user);
    delete updatedUser.password;

    return updatedUser;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }


  async findUserByEmail(email: string):Promise<User | undefined>{
    return await this.userRepository.findOneBy({email})    // return await this.userRepository.findOne({where:{email}})
  }

  async updateRefreshToken(id:string, hashRt:string){
    const user = await this.userRepository.findOneBy({ id})
    if(!user){ 
      throw new HttpException('User not found',HttpStatus.BAD_REQUEST);
    }
    user.hashRt = hashRt;
    await this.userRepository.save(user)
  }

  async logoutUser(id:string){
    const user = await this.userRepository.findOneBy({ id})
    if(!user){
        throw new HttpException('User not found',HttpStatus.BAD_REQUEST);
    }

    if(user.hashRt == null){
      throw new HttpException('Operation not allowed exceptin', HttpStatus.BAD_REQUEST); 
    }
    user.hashRt = null;
    await this.userRepository.save(user)
  }

  async updateUserProfile(id: string, updateUserProfileDto: UpdateUserProfileDto, profilePic: Express.Multer.File){
    // const user = await this.userRepository.findOneBy({ id})
    // if(!user){
    //     throw new HttpException('User not found',HttpStatus.BAD_REQUEST);
    // }

    
    const uploadedImg= await this.mediaUtils.uploadToFileServer (profilePic.path)
    // const uploadedImg= await this.mediaUtils.uploadToFileServerDirect(profilePic)

    return uploadedImg;
  } 




}

