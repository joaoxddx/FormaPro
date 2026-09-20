import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'joao@email.com', description: 'O email do usuário', required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'senha123', description: 'A senha do usuário', required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  senha: string;
}
