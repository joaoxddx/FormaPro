import { Injectable } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class CursosService {
  constructor(private prismaService: PrismaService) {}
  create(createCursoDto: CreateCursoDto) {
    return this.prismaService.curso.create({data:createCursoDto});
  }

  findAll() {
    return this.prismaService.curso.findMany({include:{
      categoria:true,
      instrutor:true
      }});
  }

  findOne(id: number) {
    return this.prismaService.curso.findUnique({where: {ID_Curso: id},
      include:{
        categoria:true,
        instrutor:true,
        modulos: {
          include: {aulas:true}
        }
      } });
  }

  update(id: number, updateCursoDto: UpdateCursoDto) {
    return this.prismaService.curso.update({where: {ID_Curso: id},data:updateCursoDto});
  }

  remove(id: number) {
    return this.prismaService.curso.delete({where: {ID_Curso: id},});
  }
}
