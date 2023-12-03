import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChamaaDto } from './dto/create-chamaa.dto';
import { UpdateChamaaDto } from './dto/update-chamaa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chamaa } from './entities/chamaa.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ChamaaProfile } from './entities/chamaa-profile.entity';

@Injectable()
export class ChamaaService {
  constructor(
    @InjectRepository(Chamaa)
    private readonly chamaaRepository: Repository<Chamaa>,
    @InjectRepository(ChamaaProfile)
    private readonly chamaaProfileRepository: Repository<ChamaaProfile>,

    private readonly userService: UsersService
  ){}
  async create(createChamaaDto: CreateChamaaDto, userId: string) {
    const chamaaRegExists = await this.getChamaaByRegistrationNumber(createChamaaDto.registrationNumber);
    if(chamaaRegExists){
      throw new HttpException('Registration Number is already registered', HttpStatus.BAD_REQUEST)
    }

    const userAccount = await this.userService.getUserAccountInfoByUserId(userId)

    const chamaa = this.chamaaRepository.create(createChamaaDto)
    const savedChamaa = await this.chamaaRepository.save(chamaa)



    const chamaaProfile = this.chamaaProfileRepository.create({
      chamaa: savedChamaa,
      createdBy: userAccount
    })
    const savedChamaaProfile = await this.chamaaProfileRepository.save(chamaaProfile);


    return savedChamaaProfile
   
   
    
  }

  async findAll() {
    return await this.chamaaRepository
      .createQueryBuilder('chamaa')
      .leftJoinAndSelect('chamaa.officials','officials')
      .leftJoinAndSelect('chamaa.chamaaProfile','chamaaProfile')
      .leftJoinAndSelect('chamaaProfile.createdBy', 'createdBy')
      .leftJoinAndSelect('createdBy.user', 'createdBUuser')
      .select([
        'chamaa.id',
        'chamaa.name',
        'chamaa.description',
        'chamaa.registrationNumber',
        'chamaa.status',

        'officials.id',
        'officials.position',
        'officials.roleDescription',

        'chamaaProfile.id',
        'chamaaProfile.createdBy',
        'chamaaProfile.locationCounty',
        'chamaaProfile.locationSubCounty',
        'chamaaProfile.locationWard',

        'createdBy.id',
        'createdBUuser.id', 
        'createdBUuser.firstName', 
        'createdBUuser.lastName',

      ])
      .getMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} chamaa`;
  }

  update(id: number, updateChamaaDto: UpdateChamaaDto) {
    return `This action updates a #${id} chamaa`;
  }

  remove(id: number) {
    return `This action removes a #${id} chamaa`;
  }

  async getChamaaByRegistrationNumber(registrationNumber: string){
    return await this.chamaaRepository.findOneBy({registrationNumber})
  }
}
