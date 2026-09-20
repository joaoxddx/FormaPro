import { PartialType } from '@nestjs/swagger';
import { CreateTrilhaCursoDto } from './create-trilha-curso.dto';

export class UpdateTrilhaCursoDto extends PartialType(CreateTrilhaCursoDto) {}
