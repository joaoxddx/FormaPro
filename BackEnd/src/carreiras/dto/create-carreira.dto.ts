import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateCarreiraDto {
    @ApiProperty({ example: 'Carreira Fullstack', description: 'Título da carreira', required: true })
    @IsString()
    @IsNotEmpty()
    Titulo: string;

    @ApiProperty({ example: 'Do zero ao profissional em desenvolvimento', description: 'Descrição detalhada', required: true })
    @IsString()
    @IsNotEmpty()
    Descricao: string;

}
