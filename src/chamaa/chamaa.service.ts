import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChamaaDto } from './dto/create-chamaa.dto';
import { UpdateChamaaDto, UpdateChamaaProfile } from './dto/update-chamaa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chamaa } from './entities/chamaa.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ChamaaProfile } from './entities/chamaa-profile.entity';
import { ChamaaOfficial } from './entities/chamaa-officials.entity';
import {  CreateOfficialPositionsDto,  UpdateOfficialPositionDto } from './dto/official-positions.dto';
import { CreateMultipleOfficialPositionsDto, OfficialPositionDto, UpdateMultipleOfficialPositionsDto, UpdateOfficialPositionsDto } from './dto/official-positions-multiple.dto';

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
      .leftJoinAndSelect('officials.userAccount', 'userAccount')
      .leftJoinAndSelect('userAccount.user', 'officialUser')
      .select([
        'chamaa.id',
        'chamaa.name',
        'chamaa.description',
        'chamaa.registrationNumber',
        'chamaa.status',

        'officials.id',
        'officials.position',
        'officials.roleDescription',
        'userAccount.id',
        'officialUser.id',
        'officialUser.firstName',
        'officialUser.middleName',
        'officialUser.lastName',
        'officialUser.phoneNumber',


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

  async findChamaaById(id: string){
    const chamaa = await this.chamaaRepository.findOneBy({id});
    if(!chamaa){
      throw new HttpException('Chamaa Not found', HttpStatus.BAD_REQUEST)
    }

    return chamaa
  }


  async findOne(id: string) {
    // const chamaa = await this.chamaaRepository.findOneBy({id})
    const chamaa = await this.chamaaRepository
      .createQueryBuilder('chamaa')
      .leftJoinAndSelect('chamaa.officials','officials')
      .leftJoinAndSelect('chamaa.chamaaProfile','chamaaProfile')
      .leftJoinAndSelect('chamaaProfile.createdBy', 'createdBy')
      .leftJoinAndSelect('createdBy.user', 'createdBUuser')
      .leftJoinAndSelect('officials.userAccount', 'userAccount')
      .leftJoinAndSelect('userAccount.user', 'officialUser')


      .select([
        'chamaa.id',
        'chamaa.name',
        'chamaa.description',
        'chamaa.registrationNumber',
        'chamaa.status',

        'officials.id',
        'officials.position',
        'officials.roleDescription',
        'userAccount.id',
        'officialUser.id',
        'officialUser.firstName',
        'officialUser.middleName',
        'officialUser.lastName',
        'officialUser.phoneNumber',



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
      .where('chamaa.id = :id',{id})
      .getOne()

    if(!chamaa){
      throw new NotFoundException('Chamaa not found')
    }

    return chamaa
  }

  async findChamaaProfileByChamaaId(id: string) {
    // const chamaa = await this.chamaaRepository.findOneBy({id})
    // const chamaaProfile = await this.chamaaProfileRepository.findOneBy({chamaa})
    const chamaaProfile = await this.chamaaProfileRepository.findOne({
      where: { chamaa: { id} },
    });


    if(!chamaaProfile){
      throw new NotFoundException('Chamaa Profile not found')
    }

    return chamaaProfile
  }

  async updateChamaa(id: string, updateChamaaDto: UpdateChamaaDto) {
    const chamaa = await this.findChamaaById(id)
    Object.assign(chamaa, updateChamaaDto)
    // return await this.chamaaRepository.save({...chamaa, ...updateChamaaDto})
    return await this.chamaaRepository.save(chamaa)

  }

  async updateChamaaProfile( updateChamaaProfile: UpdateChamaaProfile){
    const chamaaProfile = await this.findChamaaProfileByChamaaId(updateChamaaProfile.chamaa)
   
    Object.assign(chamaaProfile, updateChamaaProfile);

    return await this.chamaaProfileRepository.save(chamaaProfile)
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
  const chamaa = await this.findChamaaById(createOfficialPositionsDto.chamaa)
  const chamaaOfficialPosition = this.chamaaOfficialsRepository.create({
    ...createOfficialPositionsDto,
    chamaa
  })

  return this.chamaaOfficialsRepository.save(chamaaOfficialPosition)

}


async updateOfficialPosition(positionId: string, updateOfficialPositionDto: UpdateOfficialPositionDto,id: string){
  const position = await this.getOfficialPositionById(positionId)
 
  if(updateOfficialPositionDto.userAccount){
    const user = await this.userService.getUserAccountInfoByUserId(updateOfficialPositionDto.userAccount)
    updateOfficialPositionDto.userAccount= user.id
  }
 
  Object.assign(position, updateOfficialPositionDto)
  
  return await this.chamaaOfficialsRepository.save(position)
}

async createMultipleOfficialPositions(createMultipleOfficialPositionsDto:CreateMultipleOfficialPositionsDto,id: string){
  const chamaa = await this.findChamaaById(createMultipleOfficialPositionsDto.chamaa)
  const positionsData: OfficialPositionDto[] = createMultipleOfficialPositionsDto.positions

  const positions = positionsData.map(position => {
    console.log(position)
    return this.chamaaOfficialsRepository.create({...position, chamaa});
  });

  return this.chamaaOfficialsRepository.save(positions);


}

async updateMultipleOfficialPositions(updateMultipleOfficialPositionsDto: UpdateMultipleOfficialPositionsDto,userId: string ){
  const chamaa = await this.findChamaaById(updateMultipleOfficialPositionsDto.chamaa)
  const positionsData: UpdateOfficialPositionsDto[] = updateMultipleOfficialPositionsDto.positions;
  

  const positions = await Promise.all(
    positionsData.map(async (position) => {
      const dbPosition = await this.getOfficialPositionById(position.positionId);

      if (position.userAccount) {
        const user = await this.userService.getUserAccountInfoByUserId(position.userAccount);
        position.userAccount = user.id;
      }

      Object.assign(dbPosition, position);
      return await this.chamaaOfficialsRepository.save(dbPosition);
    })
  );

  return positions
}


  async getOfficialPositionById(id: string){
    const position =  await this.chamaaOfficialsRepository.findOneBy({id})
    if(!position){
      throw new NotFoundException('Position Not found')
    }
    return position;
  }
  async getChamaaByRegistrationNumber(registrationNumber: string){
    return await this.chamaaRepository.findOneBy({registrationNumber})
  }

}
