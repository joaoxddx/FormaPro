import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateTrilhaDto {
    @ApiProperty({ example: 'Trilha Backend', description: 'Título da trilha', required: true })
    @IsString()
    @IsNotEmpty()
    Titulo: string;

    @ApiProperty({ example: 'Trilha para desenvolvedores backend', description: 'Descrição da trilha', required: true })
    @IsString()
    @IsNotEmpty()
    Descricao: string;

    @ApiProperty({ example: 1, description: 'ID da categoria associada', required: true })
    @IsNumber()
    @IsNotEmpty()
    ID_Categoria: number;

}
