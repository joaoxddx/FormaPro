import { Injectable } from '@nestjs/common';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlanosService {
  constructor(private prisma: PrismaService) {}

  create(createPlanoDto: CreatePlanoDto) {
    return this.prisma.plano.create({ data: createPlanoDto as any });
  }

  findAll() {
    return this.prisma.plano.findMany();
  }

  findOne(id: number) {
    return this.prisma.plano.findUnique({ where: { ID_Plano: id } });
  }

  update(id: number, updatePlanoDto: UpdatePlanoDto) {
    return this.prisma.plano.update({
      where: { ID_Plano: id },
      data: updatePlanoDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.plano.delete({ where: { ID_Plano: id } });
  }
}
