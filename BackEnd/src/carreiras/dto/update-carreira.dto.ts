import { PartialType } from '@nestjs/swagger';
import { CreateCarreiraDto } from './create-carreira.dto';

export class UpdateCarreiraDto extends PartialType(CreateCarreiraDto) {}
