import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AvaliacoesService } from './avaliacoes.service';
import { AvaliacoesController } from './avaliacoes.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AvaliacoesController],
  providers: [AvaliacoesService],
})
export class AvaliacoesModule {}
