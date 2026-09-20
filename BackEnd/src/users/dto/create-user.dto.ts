import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsString,MinLength} from "class-validator";


export class CreateUserDto {
    @ApiProperty({ example: 'joao@email.com', description: 'O email do usuário' })
    @IsEmail()
    Email: string;

    @ApiProperty({ example: 'João Silva', description: 'Nome completo' })
    @IsString()
    @IsNotEmpty()
    NomeCompleto: string;

    @ApiProperty({ example: 'senha123', description: 'Senha com no mínimo 8 caracteres', minLength: 6 })
    @IsString()
    @MinLength(6)
    SenhaHash: string;

    @ApiProperty({example: 'student or admin', description: 'Tipo de acesso' })
    @IsString()
    @IsNotEmpty()
    Role: string;
    }
