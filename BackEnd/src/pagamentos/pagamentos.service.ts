import { Injectable } from '@nestjs/common';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PagamentosService {
  constructor(private prisma: PrismaService) {}

  create(createPagamentoDto: CreatePagamentoDto) {
    return this.prisma.pagamento.create({ data: createPagamentoDto as any });
  }

  findAll() {
    return this.prisma.pagamento.findMany();
  }

  findOne(id: number) {
    return this.prisma.pagamento.findUnique({ where: { ID_Pagamento: id } });
  }

  update(id: number, updatePagamentoDto: UpdatePagamentoDto) {
    return this.prisma.pagamento.update({
      where: { ID_Pagamento: id },
      data: updatePagamentoDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.pagamento.delete({ where: { ID_Pagamento: id } });
  }
}
