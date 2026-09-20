import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, senha } = loginDto;

    const user = await this.prisma.usuario.findUnique({
      where: { Email: email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(senha, user.SenhaHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { email: user.Email, sub: user.ID_Usuario, role: user.Role };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.ID_Usuario,
        nome: user.NomeCompleto,
        email: user.Email,
        role: user.Role
      }
    };
  }
}
