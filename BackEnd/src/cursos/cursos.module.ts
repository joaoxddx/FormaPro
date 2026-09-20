import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}
