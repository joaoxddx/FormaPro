import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Body, Patch, Param, Delete , UseGuards } from '@nestjs/common';
import { TrilhaCursosService } from './trilha-cursos.service';
import { CreateTrilhaCursoDto } from './dto/create-trilha-curso.dto';
import { UpdateTrilhaCursoDto } from './dto/update-trilha-curso.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('trilha-cursos')
export class TrilhaCursosController {
  constructor(private readonly trilhaCursosService: TrilhaCursosService) {}

  @Post()
  create(@Body() createTrilhaCursoDto: CreateTrilhaCursoDto) {
    return this.trilhaCursosService.create(createTrilhaCursoDto);
  }

  @Get()
  findAll() {
    return this.trilhaCursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trilhaCursosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrilhaCursoDto: UpdateTrilhaCursoDto) {
    return this.trilhaCursosService.update(+id, updateTrilhaCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trilhaCursosService.remove(+id);
  }
}
