import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Body, Patch, Param, Delete , UseGuards } from '@nestjs/common';
import { MatriculasService } from './matriculas.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('matriculas')
export class MatriculasController {
  constructor(private readonly matriculasService: MatriculasService) {}

  @Post()
  create(@Body() createMatriculaDto: CreateMatriculaDto) {
    return this.matriculasService.create(createMatriculaDto);
  }

  @Get()
  findAll() {
    return this.matriculasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matriculasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatriculaDto: UpdateMatriculaDto) {
    return this.matriculasService.update(+id, updateMatriculaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matriculasService.remove(+id);
  }
}
