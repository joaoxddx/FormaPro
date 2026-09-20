import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Body, Patch, Param, Delete , UseGuards } from '@nestjs/common';
import { CarreiraTrilhasService } from './carreira-trilhas.service';
import { CreateCarreiraTrilhaDto } from './dto/create-carreira-trilha.dto';
import { UpdateCarreiraTrilhaDto } from './dto/update-carreira-trilha.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('carreira-trilhas')
export class CarreiraTrilhasController {
  constructor(private readonly carreiraTrilhasService: CarreiraTrilhasService) {}

  @Post()
  create(@Body() createCarreiraTrilhaDto: CreateCarreiraTrilhaDto) {
    return this.carreiraTrilhasService.create(createCarreiraTrilhaDto);
  }

  @Get()
  findAll() {
    return this.carreiraTrilhasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carreiraTrilhasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarreiraTrilhaDto: UpdateCarreiraTrilhaDto) {
    return this.carreiraTrilhasService.update(+id, updateCarreiraTrilhaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carreiraTrilhasService.remove(+id);
  }
}
