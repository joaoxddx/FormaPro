import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Body, Patch, Param, Delete , UseGuards } from '@nestjs/common';
import { TrilhasService } from './trilhas.service';
import { CreateTrilhaDto } from './dto/create-trilha.dto';
import { UpdateTrilhaDto } from './dto/update-trilha.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('trilhas')
export class TrilhasController {
  constructor(private readonly trilhasService: TrilhasService) {}

  @Post()
  create(@Body() createTrilhaDto: CreateTrilhaDto) {
    return this.trilhasService.create(createTrilhaDto);
  }

  @Get()
  findAll() {
    return this.trilhasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trilhasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrilhaDto: UpdateTrilhaDto) {
    return this.trilhasService.update(+id, updateTrilhaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trilhasService.remove(+id);
  }
}
