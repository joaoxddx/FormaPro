import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Body, Patch, Param, Delete , UseGuards } from '@nestjs/common';
import { PlanosService } from './planos.service';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('planos')
export class PlanosController {
  constructor(private readonly planosService: PlanosService) {}

  @Post()
  create(@Body() createPlanoDto: CreatePlanoDto) {
    return this.planosService.create(createPlanoDto);
  }

  @Get()
  findAll() {
    return this.planosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanoDto: UpdatePlanoDto) {
    return this.planosService.update(+id, updatePlanoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planosService.remove(+id);
  }
}
