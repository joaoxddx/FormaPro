# Services NestJS com Prisma para FormaPRO

Este documento contém o código dos 11 services prontos para serem copiados nos módulos gerados via Nest CLI (`nest g resource <nome>`).

---

## 1. Matrícula (`src/matricula/matricula.service.ts`)
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';

@Injectable()
export class MatriculaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMatriculaDto: CreateMatriculaDto) {
    return this.prisma.matricula.create({
      data: createMatriculaDto,
      include: {
        usuario: true,
        curso: true,
      },
    });
  }

  async findAll() {
    return this.prisma.matricula.findMany({
      include: {
        usuario: true,
        curso: true,
      },
    });
  }

  async findOne(id: number) {
    const matricula = await this.prisma.matricula.findUnique({
      where: { ID_Matricula: id },
      include: {
        usuario: true,
        curso: true,
      },
    });
    if (!matricula) {
      throw new NotFoundException(`Matrícula com ID ${id} não encontrada`);
    }
    return matricula;
  }

  async findByUsuario(idUsuario: number) {
    return this.prisma.matricula.findMany({
      where: { ID_Usuario: idUsuario },
      include: {
        curso: true,
      },
    });
  }

  async update(id: number, updateMatriculaDto: UpdateMatriculaDto) {
    await this.findOne(id);
    return this.prisma.matricula.update({
      where: { ID_Matricula: id },
      data: updateMatriculaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.matricula.delete({
      where: { ID_Matricula: id },
    });
  }
}
```

---

## 2. Progresso Aula (`src/progresso-aula/progresso-aula.service.ts`)
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgressoAulaDto } from './dto/create-progresso-aula.dto';
import { UpdateProgressoAulaDto } from './dto/update-progresso-aula.dto';

@Injectable()
export class ProgressoAulaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProgressoAulaDto: CreateProgressoAulaDto) {
    return this.prisma.progressoAula.create({
      data: createProgressoAulaDto,
      include: {
        usuario: true,
        aula: true,
      },
    });
  }

  async findAll() {
    return this.prisma.progressoAula.findMany({
      include: {
        usuario: true,
        aula: true,
      },
    });
  }

  async findOne(idUsuario: number, idAula: number) {
    const progresso = await this.prisma.progressoAula.findUnique({
      where: {
        ID_Usuario_ID_Aula: {
          ID_Usuario: idUsuario,
          ID_Aula: idAula,
        },
      },
      include: {
        usuario: true,
        aula: true,
      },
    });
    if (!progresso) {
      throw new NotFoundException(`Progresso não encontrado para o Usuário ${idUsuario} e Aula ${idAula}`);
    }
    return progresso;
  }

  async findByUsuario(idUsuario: number) {
    return this.prisma.progressoAula.findMany({
      where: { ID_Usuario: idUsuario },
      include: {
        aula: true,
      },
    });
  }

  async update(idUsuario: number, idAula: number, updateProgressoAulaDto: UpdateProgressoAulaDto) {
    await this.findOne(idUsuario, idAula);
    return this.prisma.progressoAula.update({
      where: {
        ID_Usuario_ID_Aula: {
          ID_Usuario: idUsuario,
          ID_Aula: idAula,
        },
      },
      data: updateProgressoAulaDto,
    });
  }

  async remove(idUsuario: number, idAula: number) {
    await this.findOne(idUsuario, idAula);
    return this.prisma.progressoAula.delete({
      where: {
        ID_Usuario_ID_Aula: {
          ID_Usuario: idUsuario,
          ID_Aula: idAula,
        },
      },
    });
  }
}
```

---

## 3. Avaliação (`src/avaliacao/avaliacao.service.ts`)
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAvaliacaoDto: CreateAvaliacaoDto) {
    return this.prisma.avaliacao.create({
      data: createAvaliacaoDto,
      include: {
        usuario: true,
        curso: true,
      },
    });
  }

  async findAll() {
    return this.prisma.avaliacao.findMany({
      include: {
        usuario: true,
        curso: true,
      },
    });
  }

  async findOne(id: number) {
    const avaliacao = await this.prisma.avaliacao.findUnique({
      where: { ID_Avaliacao: id },
      include: {
        usuario: true,
        curso: true,
      },
    });
    if (!avaliacao) {
      throw new NotFoundException(`Avaliação com ID ${id} não encontrada`);
    }
    return avaliacao;
  }

  async findByCurso(idCurso: number) {
    return this.prisma.avaliacao.findMany({
      where: { ID_Curso: idCurso },
      include: {
        usuario: {
          select: { ID_Usuario: true, NomeCompleto: true },
        },
      },
    });
  }

  async update(id: number, updateAvaliacaoDto: UpdateAvaliacaoDto) {
    await this.findOne(id);
    return this.prisma.avaliacao.update({
      where: { ID_Avaliacao: id },
      data: updateAvaliacaoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.avaliacao.delete({
      where: { ID_Avaliacao: id },
    });
  }
}
```

---

## 4. Trilha (`src/trilha/trilha.service.ts`)
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrilhaDto } from './dto/create-trilha.dto';
import { UpdateTrilhaDto } from './dto/update-trilha.dto';

@Injectable()
export class TrilhaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrilhaDto: CreateTrilhaDto) {
    return this.prisma.trilha.create({
      data: createTrilhaDto,
      include: {
        categoria: true,
      },
    });
  }

  async findAll() {
    return this.prisma.trilha.findMany({
      include: {
        categoria: true,
        trilhaCursos: {
          include: {
            curso: true,
          },
          orderBy: {
            Ordem: 'asc',
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const trilha = await this.prisma.trilha.findUnique({
      where: { ID_Trilha: id },
      include: {
        categoria: true,
        trilhaCursos: {
          include: {
            curso: true,
          },
          orderBy: {
            Ordem: 'asc',
          },
        },
        carreiraTrilhas: {
          include: {
            carreira: true,
          },
        },
      },
    });
    if (!trilha) {
      throw new NotFoundException(`Trilha com ID ${id} não encontrada`);
    }
    return trilha;
  }

  async update(id: number, updateTrilhaDto: UpdateTrilhaDto) {
    await this.findOne(id);
    return this.prisma.trilha.update({
      where: { ID_Trilha: id },
      data: updateTrilhaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.trilha.delete({
      where: { ID_Trilha: id },
    });
  }
}
```

---

## 5. TrilhaCurso (`src/trilha-curso/trilha-curso.service.ts`)
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrilhaCursoDto } from './dto/create-trilha-curso.dto';
import { UpdateTrilhaCursoDto } from './dto/update-trilha-curso.dto';

@Injectable()
export class TrilhaCursoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrilhaCursoDto: CreateTrilhaCursoDto) {
    return this.prisma.trilhaCurso.create({
      data: createTrilhaCursoDto,
      include: {
        trilha: true,
        curso: true,
      },
    });
  }

  async findAll() {
    return this.prisma.trilhaCurso.findMany({
      include: {
        trilha: true,
        curso: true,
      },
      orderBy: {
        Ordem: 'asc',
      },
    });
  }

  async findOne(idTrilha: number, idCurso: number) {
    const item = await this.prisma.trilhaCurso.findUnique({
      where: {
        ID_Trilha_ID_Curso: {
          ID_Trilha: idTrilha,
          ID_Curso: idCurso,
        },
      },
      include: {
        trilha: true,
        curso: true,
      },
    });
    if (!item) {
      throw new NotFoundException(`Vínculo entre Trilha ${idTrilha} e Curso ${idCurso} não encontrado`);
    }
    return item;
  }

  async findByTrilha(idTrilha: number) {
    return this.prisma.trilhaCurso.findMany({
      where: { ID_Trilha: idTrilha },
      include: {
        curso: true,
      },
      orderBy: {
        Ordem: 'asc',
      },
    });
  }

  async update(idTrilha: number, idCurso: number, updateTrilhaCursoDto: UpdateTrilhaCursoDto) {
    await this.findOne(idTrilha, idCurso);
    return this.prisma.trilhaCurso.update({
      where: {
        ID_Trilha_ID_Curso: {
          ID_Trilha: idTrilha,
          ID_Curso: idCurso,
        },
      },
      data: updateTrilhaCursoDto,
    });
  }

  async remove(idTrilha: number, idCurso: number) {
    await this.findOne(idTrilha, idCurso);
    return this.prisma.trilhaCurso.delete({
      where: {
        ID_Trilha_ID_Curso: {
          ID_Trilha: idTrilha,
          ID_Curso: idCurso,
        },
      },
    });
  }
}
```

---

## 6. Certificado (`src/certificado/certificado.service.ts`)
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';

@Injectable()
export class CertificadoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCertificadoDto: CreateCertificadoDto) {
    return this.prisma.certificado.create({
      data: createCertificadoDto,
      include: {
        usuario: true,
        curso: true,
        trilha: true,
      },
    });
  }

  async findAll() {
    return this.prisma.certificado.findMany({
      include: {
        usuario: true,
        curso: true,
        trilha: true,
      },
    });
  }

  async findOne(id: number) {
    const certificado = await this.prisma.certificado.findUnique({
      where: { ID_Certificado: id },
      include: {
        usuario: true,
        curso: true,
        trilha: true,
      },
    });
    if (!certificado) {
      throw new NotFoundException(`Certificado com ID ${id} não encontrado`);
    }
    return certificado;
  }

  async findByCodigo(codigoVerificacao: string) {
    const certificado = await this.prisma.certificado.findUnique({
      where: { CodigoVerificacao: codigoVerificacao },
      include: {
        usuario: true,
        curso: true,
        trilha: true,
      },
    });
    if (!certificado) {
      throw new NotFoundException(`Certificado com código ${codigoVerificacao} não encontrado`);
    }
    return certificado;
  }

  async findByUsuario(idUsuario: number) {
    return this.prisma.certificado.findMany({
      where: { ID_Usuario: idUsuario },
      include: {
        curso: true,
        trilha: true,
      },
    });
  }

  async update(id: number, updateCertificadoDto: UpdateCertificadoDto) {
    await this.findOne(id);
    return this.prisma.certificado.update({
      where: { ID_Certificado: id },
      data: updateCertificadoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.certificado.delete({
      where: { ID_Certificado: id },
    });
  }
}
```

---

## 7. Plano (`src/plano/plano.service.ts`)
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';

@Injectable()
export class PlanoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPlanoDto: CreatePlanoDto) {
    return this.prisma.plano.create({
      data: createPlanoDto,
    });
  }

  async findAll() {
    return this.prisma.plano.findMany({
      include: {
        _count: {
          select: { assinaturas: true },
        },
      },
    });
  }

  async findOne(id: number) {
    const plano = await this.prisma.plano.findUnique({
      where: { ID_Plano: id },
      include: {
        assinaturas: true,
      },
    });
    if (!plano) {
      throw new NotFoundException(`Plano com ID ${id} não encontrado`);
    }
    return plano;
  }

  async update(id: number, updatePlanoDto: UpdatePlanoDto) {
    await this.findOne(id);
    return this.prisma.plano.update({
      where: { ID_Plano: id },
      data: updatePlanoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.plano.delete({
      where: { ID_Plano: id },
    });
  }
}
```

---

## 8. Assinatura (`src/assinatura/assinatura.service.ts`)
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';

@Injectable()
export class AssinaturaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAssinaturaDto: CreateAssinaturaDto) {
    return this.prisma.assinatura.create({
      data: createAssinaturaDto,
      include: {
        usuario: true,
        plano: true,
      },
    });
  }

  async findAll() {
    return this.prisma.assinatura.findMany({
      include: {
        usuario: true,
        plano: true,
        pagamentos: true,
      },
    });
  }

  async findOne(id: number) {
    const assinatura = await this.prisma.assinatura.findUnique({
      where: { ID_Assinatura: id },
      include: {
        usuario: true,
        plano: true,
        pagamentos: true,
      },
    });
    if (!assinatura) {
      throw new NotFoundException(`Assinatura com ID ${id} não encontrada`);
    }
    return assinatura;
  }

  async findByUsuario(idUsuario: number) {
    return this.prisma.assinatura.findMany({
      where: { ID_Usuario: idUsuario },
      include: {
        plano: true,
        pagamentos: true,
      },
    });
  }

  async update(id: number, updateAssinaturaDto: UpdateAssinaturaDto) {
    await this.findOne(id);
    return this.prisma.assinatura.update({
      where: { ID_Assinatura: id },
      data: updateAssinaturaDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.assinatura.delete({
      where: { ID_Assinatura: id },
    });
  }
}
```

---

## 9. Pagamento (`src/pagamento/pagamento.service.ts`)
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';

@Injectable()
export class PagamentoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPagamentoDto: CreatePagamentoDto) {
    return this.prisma.pagamento.create({
      data: createPagamentoDto,
      include: {
        assinatura: {
          include: {
            usuario: true,
            plano: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.pagamento.findMany({
      include: {
        assinatura: {
          include: {
            usuario: true,
            plano: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const pagamento = await this.prisma.pagamento.findUnique({
      where: { ID_Pagamento: id },
      include: {
        assinatura: {
          include: {
            usuario: true,
            plano: true,
          },
        },
      },
    });
    if (!pagamento) {
      throw new NotFoundException(`Pagamento com ID ${id} não encontrado`);
    }
    return pagamento;
  }

  async findByAssinatura(idAssinatura: number) {
    return this.prisma.pagamento.findMany({
      where: { ID_Assinatura: idAssinatura },
    });
  }

  async update(id: number, updatePagamentoDto: UpdatePagamentoDto) {
    await this.findOne(id);
    return this.prisma.pagamento.update({
      where: { ID_Pagamento: id },
      data: updatePagamentoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.pagamento.delete({
      where: { ID_Pagamento: id },
    });
  }
}
```

---

## 10. Carreira (`src/carreira/carreira.service.ts`)
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarreiraDto } from './dto/create-carreira.dto';
import { UpdateCarreiraDto } from './dto/update-carreira.dto';

@Injectable()
export class CarreiraService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCarreiraDto: CreateCarreiraDto) {
    return this.prisma.carreira.create({
      data: createCarreiraDto,
    });
  }

  async findAll() {
    return this.prisma.carreira.findMany({
      include: {
        carreiraTrilhas: {
          include: {
            trilha: {
              include: {
                trilhaCursos: {
                  include: {
                    curso: true,
                  },
                },
              },
            },
          },
          orderBy: {
            Ordem: 'asc',
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const carreira = await this.prisma.carreira.findUnique({
      where: { ID_Carreira: id },
      include: {
        carreiraTrilhas: {
          include: {
            trilha: {
              include: {
                categoria: true,
                trilhaCursos: {
                  include: {
                    curso: true,
                  },
                  orderBy: {
                    Ordem: 'asc',
                  },
                },
              },
            },
          },
          orderBy: {
            Ordem: 'asc',
          },
        },
      },
    });
    if (!carreira) {
      throw new NotFoundException(`Carreira com ID ${id} não encontrada`);
    }
    return carreira;
  }

  async update(id: number, updateCarreiraDto: UpdateCarreiraDto) {
    await this.findOne(id);
    return this.prisma.carreira.update({
      where: { ID_Carreira: id },
      data: updateCarreiraDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.carreira.delete({
      where: { ID_Carreira: id },
    });
  }
}
```

---

## 11. CarreiraTrilha (`src/carreira-trilha/carreira-trilha.service.ts`)
```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarreiraTrilhaDto } from './dto/create-carreira-trilha.dto';
import { UpdateCarreiraTrilhaDto } from './dto/update-carreira-trilha.dto';

@Injectable()
export class CarreiraTrilhaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCarreiraTrilhaDto: CreateCarreiraTrilhaDto) {
    return this.prisma.carreiraTrilha.create({
      data: createCarreiraTrilhaDto,
      include: {
        carreira: true,
        trilha: true,
      },
    });
  }

  async findAll() {
    return this.prisma.carreiraTrilha.findMany({
      include: {
        carreira: true,
        trilha: true,
      },
      orderBy: {
        Ordem: 'asc',
      },
    });
  }

  async findOne(idCarreira: number, idTrilha: number) {
    const item = await this.prisma.carreiraTrilha.findUnique({
      where: {
        ID_Carreira_ID_Trilha: {
          ID_Carreira: idCarreira,
          ID_Trilha: idTrilha,
        },
      },
      include: {
        carreira: true,
        trilha: true,
      },
    });
    if (!item) {
      throw new NotFoundException(`Vínculo entre Carreira ${idCarreira} e Trilha ${idTrilha} não encontrado`);
    }
    return item;
  }

  async findByCarreira(idCarreira: number) {
    return this.prisma.carreiraTrilha.findMany({
      where: { ID_Carreira: idCarreira },
      include: {
        trilha: true,
      },
      orderBy: {
        Ordem: 'asc',
      },
    });
  }

  async update(idCarreira: number, idTrilha: number, updateCarreiraTrilhaDto: UpdateCarreiraTrilhaDto) {
    await this.findOne(idCarreira, idTrilha);
    return this.prisma.carreiraTrilha.update({
      where: {
        ID_Carreira_ID_Trilha: {
          ID_Carreira: idCarreira,
          ID_Trilha: idTrilha,
        },
      },
      data: updateCarreiraTrilhaDto,
    });
  }

  async remove(idCarreira: number, idTrilha: number) {
    await this.findOne(idCarreira, idTrilha);
    return this.prisma.carreiraTrilha.delete({
      where: {
        ID_Carreira_ID_Trilha: {
          ID_Carreira: idCarreira,
          ID_Trilha: idTrilha,
        },
      },
    });
  }
}
```
