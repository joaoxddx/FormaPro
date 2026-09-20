import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateAvaliacoeDto {
    @ApiProperty({ example: 1, description: 'ID do usuário', required: true })
    @IsNumber()
    @IsNotEmpty()
    ID_Usuario: number;

    @ApiProperty({ example: 1, description: 'ID do curso', required: true })
    @IsNumber()
    @IsNotEmpty()
    ID_Curso: number;

    @ApiProperty({ example: 4.5, description: 'Nota da avaliação', required: true })
    @IsNumber()
    @IsNotEmpty()
    Nota: number;

    @ApiProperty({ example: 'Ótimo curso!', description: 'Comentário sobre o curso', required: false })
    @IsString()
    @IsOptional()
    Comentario: string;

}
