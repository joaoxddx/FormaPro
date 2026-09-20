import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { SenhaHash, ...rest } = createUserDto;
    
    // Hash da senha com salt de 10
    const hashedPassword = await bcrypt.hash(SenhaHash, 10);
    
    return this.prismaService.usuario.create({
      data: {
        ...rest,
        SenhaHash: hashedPassword
      }
    });
  }

  findAll() {
    return this.prismaService.usuario.findMany({
      select: {
        ID_Usuario: true,
        NomeCompleto: true,
        Email: true,
        Role: true,
        DataCadastro: true
      }
    });
  }

  findOne(id: number) {
    return this.prismaService.usuario.findUnique({ 
      where: { ID_Usuario: id },
      select: {
        ID_Usuario: true,
        NomeCompleto: true,
        Email: true,
        Role: true,
        DataCadastro: true
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const dataToUpdate: any = { ...updateUserDto };
    
    if (updateUserDto.SenhaHash) {
      dataToUpdate.SenhaHash = await bcrypt.hash(updateUserDto.SenhaHash, 10);
    }
    
    return this.prismaService.usuario.update({
      where: { ID_Usuario: id },
      data: dataToUpdate,
    });
  }

  remove(id: number) {
    return this.prismaService.usuario.delete({ where: { ID_Usuario: id } });
  }
}
