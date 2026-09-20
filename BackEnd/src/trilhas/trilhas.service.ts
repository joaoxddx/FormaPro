import { Injectable } from '@nestjs/common';
import { CreateTrilhaDto } from './dto/create-trilha.dto';
import { UpdateTrilhaDto } from './dto/update-trilha.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrilhasService {
  constructor(private prisma: PrismaService) {}

  create(createTrilhaDto: CreateTrilhaDto) {
    return this.prisma.trilha.create({ data: createTrilhaDto as any });
  }

  findAll() {
    return this.prisma.trilha.findMany();
  }

  findOne(id: number) {
    return this.prisma.trilha.findUnique({ where: { ID_Trilha: id } });
  }

  update(id: number, updateTrilhaDto: UpdateTrilhaDto) {
    return this.prisma.trilha.update({
      where: { ID_Trilha: id },
      data: updateTrilhaDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.trilha.delete({ where: { ID_Trilha: id } });
  }
}
