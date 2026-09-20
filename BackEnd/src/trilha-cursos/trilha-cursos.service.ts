import { Injectable } from '@nestjs/common';
import { CreateTrilhaCursoDto } from './dto/create-trilha-curso.dto';
import { UpdateTrilhaCursoDto } from './dto/update-trilha-curso.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrilhaCursosService {
  constructor(private prisma: PrismaService) {}

  create(createTrilhaCursoDto: CreateTrilhaCursoDto) {
    return this.prisma.trilhaCurso.create({ data: createTrilhaCursoDto as any });
  }

  findAll() {
    return this.prisma.trilhaCurso.findMany();
  }

  findOne(id: number) {
    // Para chaves compostas, este endpoint pode precisar de ajustes manuais
    return `This action returns a #${id} trilha-cursos (Composite key requires custom logic)`;
  }

  update(id: number, updateTrilhaCursoDto: UpdateTrilhaCursoDto) {
    return `This action updates a #${id} trilha-cursos (Composite key requires custom logic)`;
  }

  remove(id: number) {
    return `This action removes a #${id} trilha-cursos (Composite key requires custom logic)`;
  }
}
