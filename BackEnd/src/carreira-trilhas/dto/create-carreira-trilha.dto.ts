import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateCarreiraTrilhaDto {
    @ApiProperty({ example: 1, description: 'ID da carreira', required: true })
    @IsNumber()
    @IsNotEmpty()
    ID_Carreira: number;

    @ApiProperty({ example: 1, description: 'ID da trilha', required: true })
    @IsNumber()
    @IsNotEmpty()
    ID_Trilha: number;

    @ApiProperty({ example: 1, description: 'Ordem da trilha na carreira', required: true })
    @IsNumber()
    @IsNotEmpty()
    Ordem: number;

}
