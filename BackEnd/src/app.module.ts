import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ModuloModule } from './modulo/modulo.module';
import { AulasModule } from './aulas/aulas.module';
import { MatriculasModule } from './matriculas/matriculas.module';
import { ProgressoAulasModule } from './progresso-aulas/progresso-aulas.module';
import { AvaliacoesModule } from './avaliacoes/avaliacoes.module';
import { TrilhasModule } from './trilhas/trilhas.module';
import { TrilhaCursosModule } from './trilha-cursos/trilha-cursos.module';
import { CertificadosModule } from './certificados/certificados.module';
import { PlanosModule } from './planos/planos.module';
import { AssinaturasModule } from './assinaturas/assinaturas.module';
import { PagamentosModule } from './pagamentos/pagamentos.module';
import { CarreirasModule } from './carreiras/carreiras.module';
import { CarreiraTrilhasModule } from './carreira-trilhas/carreira-trilhas.module';
import { AuthModule } from './auth/auth.module';
import { CursosModule } from './cursos/cursos.module';

@Module({
  imports: [PrismaModule, UsersModule, CategoriaModule, CursosModule, ModuloModule, AulasModule, MatriculasModule, ProgressoAulasModule, AvaliacoesModule, TrilhasModule, TrilhaCursosModule, CertificadosModule, PlanosModule, AssinaturasModule, PagamentosModule, CarreirasModule, CarreiraTrilhasModule, AuthModule],
})
export class AppModule {}
