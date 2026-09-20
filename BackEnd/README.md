# FormaPRO - Back-end API 🚀

> API RESTful para a plataforma de educação corporativa e desenvolvimento profissional **FormaPRO**, desenvolvida com **NestJS**, **Prisma ORM** e **PostgreSQL**.

---

## 📌 Sumário

- [Visão Geral](#-visão-geral)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura e Módulos](#-arquitetura-e-módulos)
- [Estrutura do Banco de Dados](#-estrutura-do-banco-de-dados)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Executando a Aplicação](#-executando-a-aplicação)
- [Documentação Interativa (Swagger)](#-documentação-interativa-swagger)
- [Comandos Prisma ORM](#-comandos-prisma-orm)
- [Scripts do Projeto](#-scripts-do-projeto)
- [Estrutura de Diretórios](#-estrutura-de-diretórios)

---

## 📖 Visão Geral

O **FormaPRO** é uma plataforma completa para capacitação e desenvolvimento contínuo de profissionais. Seu back-end fornece uma infraestrutura segura, modular e escalável para gerenciar o ecossistema educacional:

- **Catálogo de Aprendizado**: Cursos divididos em módulos e aulas, organizados por categorias, trilhas de conhecimento e carreiras profissionais.
- **Jornada do Aluno**: Matrículas, acompanhamento de progresso aula a aula, avaliações de cursos e emissão de certificados com código único de validação.
- **Monetização e Planos**: Gerenciamento de planos de assinatura, assinaturas de usuários e histórico de pagamentos/transações.
- **Segurança**: Autenticação com JSON Web Token (JWT), proteção de rotas com Guards e senhas criptografadas com `bcryptjs`.

---

## 🛠 Tecnologias Utilizadas

- **Runtime & Linguagem**: [Node.js](https://nodejs.org/) & [TypeScript](https://www.typescriptlang.org/)
- **Framework Web**: [NestJS v11](https://nestjs.com/)
- **ORM & Banco de Dados**: [Prisma ORM v7](https://www.prisma.io/) com `@prisma/adapter-pg` e [PostgreSQL](https://www.postgresql.org/)
- **Autenticação & Segurança**: [Passport.js](http://www.passportjs.org/), `@nestjs/jwt`, `@nestjs/passport` e [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Validação & Sanitização**: `class-validator` e `class-transformer`
- **Documentação de API**: [Swagger / OpenAPI](https://swagger.io/) (`@nestjs/swagger`)
- **Testes**: [Jest](https://jestjs.io/) e [Supertest](https://github.com/ladjs/supertest)

---

## 🧩 Arquitetura e Módulos

A aplicação segue a arquitetura modular padrão do NestJS, onde cada recurso possui seu próprio Controller, Service, Module e DTOs (Data Transfer Objects):

| Módulo                        | Descrição / Responsabilidade                                                       |
| :----------------------------- | :----------------------------------------------------------------------------------- |
| **`auth`**             | Autenticação de usuários, login e geração de tokens JWT.                        |
| **`users`**            | Gestão de contas de usuários (alunos, instrutores e administradores).              |
| **`categoria`**        | Categorização temática de cursos e trilhas.                                       |
| **`cursos`**           | Cadastro, listagem e manutenção de cursos, com nível, instrutor e carga horária. |
| **`modulo`**           | Organização estrutural e sequencial dos conteúdos dentro de um curso.             |
| **`aulas`**            | Aulas individuais com URL de conteúdo, duração em minutos e ordenação.          |
| **`matriculas`**       | Inscrições dos alunos nos cursos e status de conclusão.                           |
| **`progresso-aulas`**  | Acompanhamento detalhado do progresso do aluno em cada aula individual.              |
| **`avaliacoes`**       | Avaliações, notas e comentários dos alunos sobre os cursos.                       |
| **`trilhas`**          | Trilhas de aprendizado agrupando conjuntos de cursos temáticos.                     |
| **`trilha-cursos`**    | Relacionamento e sequência ordenada de cursos dentro de cada trilha.                |
| **`carreiras`**        | Formações e carreiras profissionais completas.                                     |
| **`carreira-trilhas`** | Relacionamento e ordem das trilhas que compõem uma carreira.                        |
| **`certificados`**     | Geração e verificação de certificados emitidos com hash/código de validação.  |
| **`planos`**           | Definição de planos de acesso à plataforma (preço, periodicidade, benefícios).  |
| **`assinaturas`**      | Assinaturas ativas e histórico de vinculação dos usuários aos planos.            |
| **`pagamentos`**       | Registro de pagamentos e transações originadas por gateways de pagamento.          |
| **`prisma`**           | Configuração do cliente de banco de dados e ciclo de vida da conexão.             |

---

## 🗄 Estrutura do Banco de Dados

O modelo de dados implementado via Prisma (`prisma/schema.prisma`) abrange:

```mermaid
erDiagram
    Usuario ||--o{ Curso : "instrutor de"
    Usuario ||--o{ Matricula : "possui"
    Usuario ||--o{ ProgressoAula : "registra"
    Usuario ||--o{ Avaliacao : "escreve"
    Usuario ||--o{ Certificado : "recebe"
    Usuario ||--o{ Assinatura : "assina"

    Categoria ||--o{ Curso : "categoriza"
    Categoria ||--o{ Trilha : "categoriza"

    Curso ||--o{ Modulo : "contém"
    Curso ||--o{ Matricula : "recebe"
    Curso ||--o{ Avaliacao : "recebe"
    Curso ||--o{ TrilhaCurso : "participa"
    Curso ||--o{ Certificado : "gera"

    Modulo ||--o{ Aula : "contém"
    Aula ||--o{ ProgressoAula : "possui"

    Trilha ||--o{ TrilhaCurso : "composta por"
    Trilha ||--o{ CarreiraTrilha : "composta por"
    Trilha ||--o{ Certificado : "gera"

    Carreira ||--o{ CarreiraTrilha : "composta por"

    Plano ||--o{ Assinatura : "oferece"
    Assinatura ||--o{ Pagamento : "gera"
```

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em seu ambiente:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) em execução (localmente ou via Docker)

---

## ⚙️ Instalação e Configuração

1. **Clone o repositório:**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd backend
   ```
2. **Instale as dependências:**

   ```bash
   npm install
   ```
3. **Configure as variáveis de ambiente:**
   Copie o arquivo `.env.example` criando um novo `.env`:

   ```bash
   cp .env.example .env
   ```

   > No Windows (PowerShell):
   >
   > ```powershell
   > Copy-Item .env.example .env
   > ```
   >
4. **Ajuste as configurações no `.env`** com as credenciais do seu banco de dados PostgreSQL e segredo JWT.
5. **Execute as migrações do banco de dados:**

   ```bash
   npx prisma migrate dev
   ```
6. **Gere o Prisma Client:**

   ```bash
   npx prisma generate
   ```

---

## 🔐 Variáveis de Ambiente

As principais variáveis configuradas no arquivo `.env` são:

| Variável        | Descrição                                  | Exemplo                                                                 |
| :--------------- | :------------------------------------------- | :---------------------------------------------------------------------- |
| `DATABASE_URL` | String de conexão com o PostgreSQL          | `postgresql://postgres:1234@localhost:5432/formapro_db?schema=public` |
| `PORT`         | Porta onde o servidor HTTP responderá       | `3000`                                                                |
| `JWT_SECRET`   | Chave secreta para assinatura dos tokens JWT | `sua_chave_secreta_jwt_aqui`                                          |

---

## 🚀 Executando a Aplicação

```bash
# Modo de desenvolvimento (com hot-reload)
$ npm run start:dev

# Modo padrão
$ npm run start

# Modo de produção (compilado)
$ npm run build
$ npm run start:prod
```

O servidor estará disponível por padrão em: `http://localhost:3000`

---

## 📑 Documentação Interativa (Swagger)

A API possui documentação interativa gerada automaticamente com **Swagger/OpenAPI**.

Após iniciar o servidor, acesse no navegador:
👉 **[http://localhost:3000/api](http://localhost:3000/api)**

### 🔑 Autenticação no Swagger:

1. Crie um usuário no endpoint `POST /users` ou utilize um existente.
2. Realize o login no endpoint `POST /auth/login` informando `email` e `senha`.
3. Copie o token retornado (`access_token`).
4. Clique no botão **Authorize** no topo da página do Swagger, insira o token no campo correspondente e confirme.

---

## 💎 Comandos Prisma ORM

| Comando                    | Descrição                                                           |
| :------------------------- | :-------------------------------------------------------------------- |
| `npx prisma migrate dev` | Aplica migrações pendentes em ambiente de desenvolvimento.          |
| `npx prisma db push`     | Sincroniza o schema diretamente com o banco sem criar migrações.    |
| `npx prisma generate`    | Regenera o Prisma Client no diretório configurado.                   |
| `npx prisma studio`      | Abre o painel web interativo para visualização e edição de dados. |

---

## 🧪 Scripts do Projeto

```bash
# Execução dos testes unitários
$ npm run test

# Modo observador para testes
$ npm run test:watch

# Cobertura de testes
$ npm run test:cov

# Testes de ponta a ponta (e2e)
$ npm run test:e2e

# Formatação de código com Prettier
$ npm run format

# Verificação estática com ESLint
$ npm run lint
```

---

## 📂 Estrutura de Diretórios

```plaintext
backend/
├── prisma/
│   ├── migrations/          # Histórico de migrações do banco
│   └── schema.prisma        # Definição de modelos e relacionamentos do Prisma
├── src/
│   ├── assinaturas/         # Módulo de Assinaturas de Planos
│   ├── aulas/               # Módulo de Aulas
│   ├── auth/                # Módulo de Autenticação (JWT, Strategies, Guards)
│   ├── avaliacoes/          # Módulo de Avaliações de Cursos
│   ├── carreira-trilhas/    # Relacionamento Carreira x Trilha
│   ├── carreiras/           # Módulo de Carreiras
│   ├── categoria/           # Módulo de Categorias
│   ├── certificados/        # Módulo de Certificados
│   ├── cursos/              # Módulo de Cursos
│   ├── generated/           # Código gerado pelo Prisma Client
│   ├── matriculas/          # Módulo de Matrículas em Cursos
│   ├── modulo/              # Módulo de Módulos de Curso
│   ├── pagamentos/          # Módulo de Transações e Pagamentos
│   ├── planos/              # Módulo de Planos
│   ├── prisma/              # PrismaService e injeção do PrismaPg Adapter
│   ├── progresso-aulas/     # Módulo de Progresso de Aulas
│   ├── trilha-cursos/       # Relacionamento Trilha x Curso
│   ├── trilhas/             # Módulo de Trilhas de Aprendizado
│   ├── users/               # Módulo de Usuários
│   ├── app.module.ts        # Módulo raiz da aplicação
│   └── main.ts              # Ponto de entrada (Bootstrap, Swagger, CORS, Pipes)
├── test/                    # Configurações e testes E2E
├── .env.example             # Exemplo de variáveis de ambiente
├── package.json             # Dependências e scripts do projeto
├── tsconfig.json            # Configurações do TypeScript
└── README.md                # Documentação do projeto
```

---

## 👥 Equipe e Licença

Desenvolvido para a disciplina de **Técnicas de Construção de Software 2**.
Distribuído sob licença proprietária/acadêmica.
