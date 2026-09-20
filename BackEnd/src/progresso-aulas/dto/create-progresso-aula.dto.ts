import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateProgressoAulaDto {
    @ApiProperty({ example: 1, description: 'ID do usuário', required: true })
    @IsNumber()
    @IsNotEmpty()
    ID_Usuario: number;

    @ApiProperty({ example: 1, description: 'ID da aula', required: true })
    @IsNumber()
    @IsNotEmpty()
    ID_Aula: number;

    @ApiProperty({ example: '2024-12-31T23:59:59Z', description: 'Data de conclusão da aula', required: false })
    @IsDateString()
    @IsOptional()
    DataConclusao: Date;

    @ApiProperty({ example: 'concluida', description: 'Status do progresso', required: false })
    @IsString()
    @IsOptional()
    Status: string;

}
