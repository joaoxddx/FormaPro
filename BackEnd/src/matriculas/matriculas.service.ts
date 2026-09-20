import { Injectable } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatriculasService {
  constructor(private prisma: PrismaService) {}

  create(createMatriculaDto: CreateMatriculaDto) {
    return this.prisma.matricula.create({ data: createMatriculaDto as any });
  }

  findAll() {
    return this.prisma.matricula.findMany();
  }

  findOne(id: number) {
    return this.prisma.matricula.findUnique({ where: { ID_Matricula: id } });
  }

  update(id: number, updateMatriculaDto: UpdateMatriculaDto) {
    return this.prisma.matricula.update({
      where: { ID_Matricula: id },
      data: updateMatriculaDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.matricula.delete({ where: { ID_Matricula: id } });
  }
}
