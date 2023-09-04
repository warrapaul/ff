import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
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
    delete savedUser.password
    return savedUser
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({where:{id}})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


  async findUserByEmail(email){
    // return await this.userRepository.findOne({where:{email}})
    return await this.userRepository.findOneBy({email})
  }
}
