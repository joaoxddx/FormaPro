import { PartialType } from '@nestjs/swagger';
import { CreateCarreiraTrilhaDto } from './create-carreira-trilha.dto';

export class UpdateCarreiraTrilhaDto extends PartialType(CreateCarreiraTrilhaDto) {}
