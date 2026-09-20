import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Body, Patch, Param, Delete , UseGuards } from '@nestjs/common';
import { CarreirasService } from './carreiras.service';
import { CreateCarreiraDto } from './dto/create-carreira.dto';
import { UpdateCarreiraDto } from './dto/update-carreira.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('carreiras')
export class CarreirasController {
  constructor(private readonly carreirasService: CarreirasService) {}

  @Post()
  create(@Body() createCarreiraDto: CreateCarreiraDto) {
    return this.carreirasService.create(createCarreiraDto);
  }

  @Get()
  findAll() {
    return this.carreirasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carreirasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarreiraDto: UpdateCarreiraDto) {
    return this.carreirasService.update(+id, updateCarreiraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carreirasService.remove(+id);
  }
}
