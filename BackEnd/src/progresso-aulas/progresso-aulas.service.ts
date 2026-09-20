import { Injectable } from '@nestjs/common';
import { CreateProgressoAulaDto } from './dto/create-progresso-aula.dto';
import { UpdateProgressoAulaDto } from './dto/update-progresso-aula.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressoAulasService {
  constructor(private prisma: PrismaService) {}

  create(createProgressoAulaDto: CreateProgressoAulaDto) {
    return this.prisma.progressoAula.create({ data: createProgressoAulaDto as any });
  }

  findAll() {
    return this.prisma.progressoAula.findMany();
  }

  findOne(id: number) {
    // Para chaves compostas, este endpoint pode precisar de ajustes manuais
    return `This action returns a #${id} progresso-aulas (Composite key requires custom logic)`;
  }

  update(id: number, updateProgressoAulaDto: UpdateProgressoAulaDto) {
    return `This action updates a #${id} progresso-aulas (Composite key requires custom logic)`;
  }

  remove(id: number) {
    return `This action removes a #${id} progresso-aulas (Composite key requires custom logic)`;
  }
}
