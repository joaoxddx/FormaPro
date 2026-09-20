import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty,IsOptional,IsNumber, IsString} from "class-validator";

export class CreateCursoDto {
    @ApiProperty({ example: 'NestJS Completo' })
    @IsString()
    @IsNotEmpty()
    Titulo: string;

    @ApiProperty({ example: 'Descrição do curso' })
    @IsString()
    @IsNotEmpty()
    Descricao: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    ID_Categoria: number;

    @ApiProperty({ example: 1 , required: false})
    @IsNumber()
    @IsNotEmpty()
    ID_Instrutor: number;

    @ApiProperty({ example: 'Iniciante' })
    @IsNotEmpty()
    @IsString()
    Nivel: string;

    @ApiProperty({ example: 'https://exemplo.com/capa.png', required: false })
    @IsString()
    @IsOptional()
    ImgUrl: string;

}
