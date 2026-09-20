import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateMatriculaDto {
    @ApiProperty({ example: 1, description: 'ID do usuário', required: true })
    @IsNumber()
    @IsNotEmpty()
    ID_Usuario: number;

    @ApiProperty({ example: 1, description: 'ID do curso', required: true })
    @IsNumber()
    @IsNotEmpty()
    ID_Curso: number;

    @ApiProperty({ example: '2024-12-31T23:59:59Z', description: 'Data de conclusão da matrícula', required: false })
    @IsDateString()
    @IsOptional()
    DataConclusao: Date;

}
