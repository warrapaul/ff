import { PartialType } from '@nestjs/swagger';
import { CreateChamaaDto } from './create-chamaa.dto';

export class UpdateChamaaDto extends PartialType(CreateChamaaDto) {}
