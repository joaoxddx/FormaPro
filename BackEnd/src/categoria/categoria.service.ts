import { Injectable } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class CategoriaService {
  constructor(private prismaService: PrismaService) {}
  create(createCategoriaDto: CreateCategoriaDto) {
    return this.prismaService.categoria.create({data:createCategoriaDto});
  }

  findAll() {
    return this.prismaService.categoria.findMany();
  }

  findOne(id: number) {
    return this.prismaService.categoria.findUnique({ where: { ID_Categoria: id } });
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return this.prismaService.categoria.update(
        {where: { ID_Categoria: id },
          data: updateCategoriaDto,})
  }

  remove(id: number) {
    return this.prismaService.categoria.delete({where: { ID_Categoria: id }});
  }
}
