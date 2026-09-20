import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CertificadosService } from './certificados.service';
import { CertificadosController } from './certificados.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CertificadosController],
  providers: [CertificadosService],
})
export class CertificadosModule {}
