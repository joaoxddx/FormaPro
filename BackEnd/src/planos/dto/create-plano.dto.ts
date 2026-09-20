import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreatePlanoDto {
    @ApiProperty({ example: 'Plano Pro', description: 'Nome do plano', required: true })
    @IsString()
    @IsNotEmpty()
    Nome: string;

    @ApiProperty({ example: 'Acesso a todos os cursos', description: 'Descrição do plano', required: true })
    @IsString()
    @IsNotEmpty()
    Descricao: string;

    @ApiProperty({ example: 49.9, description: 'Preço do plano', required: true })
    @IsNumber()
    @IsNotEmpty()
    Preco: number;

    @ApiProperty({ example: 12, description: 'Duração em meses', required: true })
    @IsNumber()
    @IsNotEmpty()
    DuracaoMeses: number;

}
