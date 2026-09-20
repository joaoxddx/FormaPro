import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { CarreiraTrilhasService } from './carreira-trilhas.service';
import { CarreiraTrilhasController } from './carreira-trilhas.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CarreiraTrilhasController],
  providers: [CarreiraTrilhasService],
})
export class CarreiraTrilhasModule {}
