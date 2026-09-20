import { Injectable } from '@nestjs/common';
import { CreateCarreiraDto } from './dto/create-carreira.dto';
import { UpdateCarreiraDto } from './dto/update-carreira.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarreirasService {
  constructor(private prisma: PrismaService) {}

  create(createCarreiraDto: CreateCarreiraDto) {
    return this.prisma.carreira.create({ data: createCarreiraDto as any });
  }

  findAll() {
    return this.prisma.carreira.findMany();
  }

  findOne(id: number) {
    return this.prisma.carreira.findUnique({ where: { ID_Carreira: id } });
  }

  update(id: number, updateCarreiraDto: UpdateCarreiraDto) {
    return this.prisma.carreira.update({
      where: { ID_Carreira: id },
      data: updateCarreiraDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.carreira.delete({ where: { ID_Carreira: id } });
  }
}
