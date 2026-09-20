import { Injectable } from '@nestjs/common';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class ModuloService {
  constructor(private prismaService: PrismaService) {}
  create(createModuloDto: CreateModuloDto) {
    return this.prismaService.modulo.create({data:createModuloDto});
  }

  findAll() {
    return this.prismaService.modulo.findMany();
  }

  findOne(id: number) {
    return this.prismaService.modulo.findUnique({where: {ID_Modulo: id}});

  }

  update(id: number, updateModuloDto: UpdateModuloDto) {
    return this.prismaService.modulo.update({where:{ID_Modulo: id},data:updateModuloDto});
  }

  remove(id: number) {
    return this.prismaService.modulo.delete({where:{ID_Modulo: id}});
  }
}
