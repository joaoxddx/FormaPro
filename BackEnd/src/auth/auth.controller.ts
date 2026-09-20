import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Fazer login na plataforma' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso, retorna o token JWT.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
