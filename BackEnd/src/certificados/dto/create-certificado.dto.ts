import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateCertificadoDto {
    @ApiProperty({ example: 1, description: 'ID do usuário', required: true })
    @IsNumber()
    @IsNotEmpty()
    ID_Usuario: number;

    @ApiProperty({ example: 1, description: 'ID do curso (opcional se for trilha)', required: false })
    @IsNumber()
    @IsOptional()
    ID_Curso: number;

    @ApiProperty({ example: 1, description: 'ID da trilha (opcional se for curso)', required: false })
    @IsNumber()
    @IsOptional()
    ID_Trilha: number;

    @ApiProperty({ example: 'CERT-123456', description: 'Código de verificação único', required: true })
    @IsString()
    @IsNotEmpty()
    CodigoVerificacao: string;

}
