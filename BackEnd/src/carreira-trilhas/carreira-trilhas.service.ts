import { Injectable } from '@nestjs/common';
import { CreateCarreiraTrilhaDto } from './dto/create-carreira-trilha.dto';
import { UpdateCarreiraTrilhaDto } from './dto/update-carreira-trilha.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarreiraTrilhasService {
  constructor(private prisma: PrismaService) {}

  create(createCarreiraTrilhaDto: CreateCarreiraTrilhaDto) {
    return this.prisma.carreiraTrilha.create({ data: createCarreiraTrilhaDto as any });
  }

  findAll() {
    return this.prisma.carreiraTrilha.findMany();
  }

  findOne(id: number) {
    // Para chaves compostas, este endpoint pode precisar de ajustes manuais
    return `This action returns a #${id} carreira-trilhas (Composite key requires custom logic)`;
  }

  update(id: number, updateCarreiraTrilhaDto: UpdateCarreiraTrilhaDto) {
    return `This action updates a #${id} carreira-trilhas (Composite key requires custom logic)`;
  }

  remove(id: number) {
    return `This action removes a #${id} carreira-trilhas (Composite key requires custom logic)`;
  }
}
