import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PlanosService } from './planos.service';
import { PlanosController } from './planos.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PlanosController],
  providers: [PlanosService],
})
export class PlanosModule {}
