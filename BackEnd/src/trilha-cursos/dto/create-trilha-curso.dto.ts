import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateTrilhaCursoDto {
    @ApiProperty({ example: 1, description: 'ID da trilha', required: true })
    @IsNumber()
    @IsNotEmpty()
    ID_Trilha: number;

    @ApiProperty({ example: 1, description: 'ID do curso', required: true })
    @IsNumber()
    @IsNotEmpty()
    ID_Curso: number;

    @ApiProperty({ example: 1, description: 'Ordem do curso na trilha', required: true })
    @IsNumber()
    @IsNotEmpty()
    Ordem: number;

}
