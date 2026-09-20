import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CarreirasService } from './carreiras.service';
import { CarreirasController } from './carreiras.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CarreirasController],
  providers: [CarreirasService],
})
export class CarreirasModule {}
