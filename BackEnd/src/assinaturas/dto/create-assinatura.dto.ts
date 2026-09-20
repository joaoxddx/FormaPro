import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateAssinaturaDto {
    @ApiProperty({ example: 1, description: 'ID do usuário', required: true })
    @IsNumber()
    @IsNotEmpty()
    ID_Usuario: number;

    @ApiProperty({ example: 1, description: 'ID do plano', required: true })
    @IsNumber()
    @IsNotEmpty()
    ID_Plano: number;

    @ApiProperty({ example: '2025-12-31T23:59:59Z', description: 'Data de término da assinatura', required: false })
    @IsDateString()
    @IsOptional()
    DataFim: Date;

}
