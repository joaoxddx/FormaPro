import { Injectable } from '@nestjs/common';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CertificadosService {
  constructor(private prisma: PrismaService) {}

  create(createCertificadoDto: CreateCertificadoDto) {
    return this.prisma.certificado.create({ data: createCertificadoDto as any });
  }

  findAll() {
    return this.prisma.certificado.findMany();
  }

  findOne(id: number) {
    return this.prisma.certificado.findUnique({ where: { ID_Certificado: id } });
  }

  update(id: number, updateCertificadoDto: UpdateCertificadoDto) {
    return this.prisma.certificado.update({
      where: { ID_Certificado: id },
      data: updateCertificadoDto as any,
    });
  }

  remove(id: number) {
    return this.prisma.certificado.delete({ where: { ID_Certificado: id } });
  }
}
