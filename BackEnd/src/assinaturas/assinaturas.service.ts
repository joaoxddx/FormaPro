import { Injectable } from '@nestjs/common';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssinaturasService {
  constructor(private prisma: PrismaService) {}

  create(createAssinaturaDto: CreateAssinaturaDto) {
    return this.prisma.assinatura.create({ data: createAssinaturaDto as any });
  }

  findAll() {
    return this.prisma.assinatura.findMany();
  }

  findOne(id: number) {
    return this.prisma.assinatura.findUnique({ where: { ID_Assinatura: id } });
  }

  update(id: number, updateAssinaturaDto: UpdateAssinaturaDto) {
    return this.prisma.assinatura.update({
      where: { ID_Assinatura: id },
      data: updateAssinaturaDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.assinatura.delete({ where: { ID_Assinatura: id } });
  }
}
