import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AssinaturasService } from './assinaturas.service';
import { AssinaturasController } from './assinaturas.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AssinaturasController],
  providers: [AssinaturasService],
})
export class AssinaturasModule {}
