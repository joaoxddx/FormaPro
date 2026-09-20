import { Injectable } from '@nestjs/common';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class AulasService {
  constructor(private prismaService: PrismaService) {}
  create(createAulaDto: CreateAulaDto) {
    return this.prismaService.aula.create({data: createAulaDto});
  }

  findAll() {
    return this.prismaService.aula.findMany();
  }

  findOne(id: number) {
    return this.prismaService.aula.findUnique({where:{ID_Aula:id},include:{
      modulo:true,
        progressos:true,
      }});
  }

  update(id: number, updateAulaDto: UpdateAulaDto) {
    return this.prismaService.aula.update({where:{ID_Aula:id},data:updateAulaDto});
  }

  remove(id: number) {
    return this.prismaService.aula.delete({where:{ID_Aula:id},});
  }
}
