import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ProgressoAulasService } from './progresso-aulas.service';
import { ProgressoAulasController } from './progresso-aulas.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ProgressoAulasController],
  providers: [ProgressoAulasService],
})
export class ProgressoAulasModule {}
