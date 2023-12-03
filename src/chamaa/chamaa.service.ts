import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChamaaDto } from './dto/create-chamaa.dto';
import { UpdateChamaaDto } from './dto/update-chamaa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chamaa } from './entities/chamaa.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ChamaaProfile } from './entities/chamaa-profile.entity';
import { ChamaaOfficial } from './entities/chamaa-officials.entity';
import { CreateMultipleOfficialPositionsDto, CreateOfficialPositionsDto, OfficialPositionDto } from './dto/official-positions.dto';

@Injectable()
export class ChamaaService {
  constructor(
    @InjectRepository(Chamaa)
    private readonly chamaaRepository: Repository<Chamaa>,
    @InjectRepository(ChamaaProfile)
    private readonly chamaaProfileRepository: Repository<ChamaaProfile>,
    @InjectRepository(ChamaaOfficial)
    private readonly chamaaOfficialsRepository: Repository<ChamaaOfficial>,

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

  async findOne(id: string) {
    const chamaa = await this.chamaaRepository.findOneBy({id})
    if(!chamaa){
      throw new NotFoundException('Chamaa not found')
    }

    return chamaa
  }

  update(id: number, updateChamaaDto: UpdateChamaaDto) {
    return `This action updates a #${id} chamaa`;
  }

  async remove(id: string) {
    const chamaa = await this.chamaaRepository.findOne({
      where :{id},
      relations:{
        chamaaProfile: true,
        officials: true
      }
    })
    if(!chamaa){
      throw new HttpException('Chamaa not found', HttpStatus.BAD_REQUEST)
    }

    if (chamaa.chamaaProfile) {
      await this.chamaaProfileRepository.remove(chamaa.chamaaProfile);
    }

    if (chamaa.officials && chamaa.officials.length > 0) {
      for (const official of chamaa.officials) {
        await this.chamaaOfficialsRepository.remove(official);
      }
    }

    await this.chamaaRepository.remove(chamaa)
    return {
      "statusCode": HttpStatus.OK,
      "message": "Chamaa deleted successfully"
  };
}

async createOfficialPosition(createOfficialPositionsDto:CreateOfficialPositionsDto,id: string){
  const chamaa = await this.findOne(createOfficialPositionsDto.chamaa)
  const chamaaOfficialPosition = this.chamaaOfficialsRepository.create({
    ...createOfficialPositionsDto,
    chamaa
  })

  return this.chamaaOfficialsRepository.save(chamaaOfficialPosition)

}
async createOfficialPositions(createMultipleOfficialPositionsDto:CreateMultipleOfficialPositionsDto,id: string){
  const chamaa = await this.findOne(createMultipleOfficialPositionsDto.chamaa)
  const positionsData: OfficialPositionDto[] = createMultipleOfficialPositionsDto.positions

  const positions = positionsData.map(position => {
    console.log(position)
    return this.chamaaOfficialsRepository.create({...position, chamaa});
  });

  return this.chamaaOfficialsRepository.save(positions);


}


  async getChamaaByRegistrationNumber(registrationNumber: string){
    return await this.chamaaRepository.findOneBy({registrationNumber})
  }
}
