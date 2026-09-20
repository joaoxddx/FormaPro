import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Body, Patch, Param, Delete , UseGuards } from '@nestjs/common';
import { ProgressoAulasService } from './progresso-aulas.service';
import { CreateProgressoAulaDto } from './dto/create-progresso-aula.dto';
import { UpdateProgressoAulaDto } from './dto/update-progresso-aula.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('progresso-aulas')
export class ProgressoAulasController {
  constructor(private readonly progressoAulasService: ProgressoAulasService) {}

  @Post()
  create(@Body() createProgressoAulaDto: CreateProgressoAulaDto) {
    return this.progressoAulasService.create(createProgressoAulaDto);
  }

  @Get()
  findAll() {
    return this.progressoAulasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.progressoAulasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgressoAulaDto: UpdateProgressoAulaDto) {
    return this.progressoAulasService.update(+id, updateProgressoAulaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.progressoAulasService.remove(+id);
  }
}
