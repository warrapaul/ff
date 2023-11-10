import { Injectable } from '@nestjs/common';
import { CreateChamaaDto } from './dto/create-chamaa.dto';
import { UpdateChamaaDto } from './dto/update-chamaa.dto';

@Injectable()
export class ChamaaService {
  create(createChamaaDto: CreateChamaaDto) {
    return 'This action adds a new chamaa';
  }

  findAll() {
    return `This action returns all chamaa`;
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
}
