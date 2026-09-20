import { Injectable } from '@nestjs/common';
import { CreateAvaliacoeDto } from './dto/create-avaliacoe.dto';
import { UpdateAvaliacoeDto } from './dto/update-avaliacoe.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AvaliacoesService {
  constructor(private prisma: PrismaService) {}

  create(createAvaliacoeDto: CreateAvaliacoeDto) {
    return this.prisma.avaliacao.create({ data: createAvaliacoeDto as any });
  }

  findAll() {
    return this.prisma.avaliacao.findMany();
  }

  findOne(id: number) {
    return this.prisma.avaliacao.findUnique({ where: { ID_Avaliacao: id } });
  }

  update(id: number, updateAvaliacoeDto: UpdateAvaliacoeDto) {
    return this.prisma.avaliacao.update({
      where: { ID_Avaliacao: id },
      data: updateAvaliacoeDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.avaliacao.delete({ where: { ID_Avaliacao: id } });
  }
}
