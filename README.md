<div align="center">

## 📖 Visão Geral

O **FormaPRO** é um ecossistema educacional completo voltado para o aprendizado corporativo e desenvolvimento profissional contínuo. A solução integra um **Front-end SPA moderno e responsivo** a uma **API RESTful escalável, fortemente tipada e segura**, oferecendo ambientes especializados tanto para estudantes quanto para administradores e instrutores.

O projeto organiza a jornada do aluno em uma hierarquia pedagógica clara:

> **Carreira Profissional** ➔ **Trilhas de Aprendizado** ➔ **Cursos Temáticos** ➔ **Módulos Estruturados** ➔ **Aulas & Vídeos**

---

## 🏛 Arquitetura da Solução

O projeto é estruturado no formato monorepo organizado em duas camadas independentes e desacopladas:

```mermaid
flowchart TD
    subgraph Client["Front-End (Client SPA)"]
        UI["Interface do Usuário<br/>(React 19 + TypeScript + Vite)"]
        Router["Roteamento Dinâmico<br/>(React Router DOM)"]
        Styles["Estilização & Componentes<br/>(Bootstrap 5 & Lucide Icons)"]
        AxiosClient["Cliente HTTP<br/>(Axios com Interceptors JWT)"]
        
        UI --> Router
        Router --> Styles
        Styles --> AxiosClient
    end

    subgraph Server["Back-End (API RESTful)"]
        Gateway["Servidor HTTP<br/>(NestJS v11 + Express)"]
        Guards["Segurança & Autenticação<br/>(JWT Guard & Passport)"]
        Pipes["Validação & DTOs<br/>(class-validator & class-transformer)"]
        Controllers["Controllers REST<br/>(Swagger / OpenAPI)"]
        Services["Camada de Serviços<br/>(Regras de Negócio)"]
        ORM["Mapeamento Objeto-Relacional<br/>(Prisma ORM v7)"]

        Gateway --> Guards
        Guards --> Pipes
        Pipes --> Controllers
        Controllers --> Services
        Services --> ORM
    end

    subgraph Database["Persistência de Dados"]
        Postgres[("Banco de Dados Relacional<br/>PostgreSQL")]
    end

    AxiosClient -->|"Requisições HTTP / JSON (Bearer Token)"| Gateway
    ORM -->|"Queries SQL Seguras (Prisma Client)"| Postgres
```

---

## ✨ Principais Funcionalidades

### 🎓 1. Área do Aluno (Student Experience)

- **Vitrine e Catálogo**: Navegação dinâmica por cursos em destaque, categorias, trilhas de conhecimento e carreiras formativas.
- **Navegação Drill-Down**: Exploração aprofundada da grade curricular antes e após a matrícula.
- **Matrículas Flexíveis**: Inscrição em cursos avulsos, trilhas integradas ou adesão a planos de assinatura.
- **Sala de Aula Virtual (LMS Player)**:
  - Reprodutor de vídeo dedicado integrado à grade curricular.
  - Divisão organizada por módulos e lista de aulas.
  - Marcador de status de conclusão aula a aula em tempo real.
- **Avaliações & Feedbacks**: Envio de notas e comentários pedagógicos sobre os cursos concluídos.
- **Certificação Digital**: Emissão de certificados de conclusão com geração de hash/código de autenticidade único para validação.

### 🛠️ 2. Painel Administrativo & Gestão Pedagógica

- **Gestão de Usuários & Acessos**: Controle de permissões e perfis de usuário (`Aluno`, `Instrutor`, `Administrador`).
- **Montador de Cursos**: Criação e estruturação ágil de novos cursos, criação de módulos sequenciais e cadastro de aulas com URLs e tempos de duração.
- **Gestão de Conteúdo**: Cadastro e organização de Categorias, Trilhas de Formação e Carreiras Especializadas.
- **Controle de Matrículas e Assinaturas**: Acompanhamento de alunos ativos e histórico de inscrições.

### 💳 3. Monetização e Planos de Assinatura

- **Planos de Acesso**: Definição de planos com diferentes periodicidades (Mensal, Semestral, Anual) e benefícios específicos.
- **Fluxo de Pagamento**: Interface de checkout para simulação e confirmação de transações.
- **Histórico Financeiro**: Registro das transações originadas por gateways de pagamento.

---

## 🛠 Tecnologias Utilizadas

### Front-End

| Tecnologia                      | Finalidade                                                                       |
| :------------------------------ | :------------------------------------------------------------------------------- |
| **React 19**              | Biblioteca base para construção de interfaces reativas e performáticas                 |
| **TypeScript**            | Tipagem estática para maior previsibilidade e segurança de código                      |
| **Vite 6**                | Bundler de alta performance com hot-module replacement instantâneo                     |
| **React Router DOM 7**    | Gerenciamento de rotas e navegação client-side                                         |
| **Bootstrap 5.3 & Icons** | Framework de componentes visuais, grids responsivos e ícones                           |
| **Lucide React**          | Conjunto moderno e consistente de ícones vetoriais                                     |
| **Axios**                 | Cliente HTTP com suporte a interceptors para injeção automática de tokens JWT          |
| **JSON Server**           | API mock para suporte a testes e prototipagem local isolada                            |

### Back-End

| Tecnologia                              | Finalidade                                                                    |
| :-------------------------------------- | :---------------------------------------------------------------------------- |
| **NestJS 11**                     | Framework corporativo em Node.js com arquitetura modular e escalável                |
| **TypeScript**                    | Desenvolvimento backend tipado com suporte a decoradores                            |
| **Prisma ORM 7**                  | ORM moderno para modelagem declarativa e geração segura de queries                  |
| **PostgreSQL**                    | Sistema gerenciador de banco de dados relacional robusto e confiável                |
| **Passport & JWT**                | Autenticação stateless via JSON Web Tokens e proteção de rotas com Guards           |
| **Bcrypt.js**                     | Algoritmo criptográfico de dispersão unidirecional com salt para senhas             |
| **Class Validator & Transformer** | Validação, sanitização e transformação de payloads DTO                              |
| **Swagger / OpenAPI**             | Geração automatizada de documentação interativa e testes de endpoints               |
| **Jest & Supertest**              | Framework de testes unitários e de integração (e2e)                                 |

---

## 🗄 Modelo de Dados e Entidades

O banco de dados do **FormaPRO** foi projetado seguindo as melhores práticas relacionais, contemplando integridade referencial e normalização:

```mermaid
erDiagram
    Usuario ||--o{ Curso : "ministra"
    Usuario ||--o{ Matricula : "realiza"
    Usuario ||--o{ ProgressoAula : "executa"
    Usuario ||--o{ Avaliacao : "publica"
    Usuario ||--o{ Certificado : "obtém"
    Usuario ||--o{ Assinatura : "contrata"

    Categoria ||--o{ Curso : "categoriza"
    Categoria ||--o{ Trilha : "categoriza"

    Curso ||--o{ Modulo : "contém"
    Curso ||--o{ Matricula : "recebe"
    Curso ||--o{ Avaliacao : "recebe"
    Curso ||--o{ TrilhaCurso : "vincula"
    Curso ||--o{ Certificado : "emite"

    Modulo ||--o{ Aula : "contém"
    Aula ||--o{ ProgressoAula : "rastreia"

    Trilha ||--o{ TrilhaCurso : "composta por"
    Trilha ||--o{ CarreiraTrilha : "composta por"
    Trilha ||--o{ Certificado : "emite"

    Carreira ||--o{ CarreiraTrilha : "composta por"

    Plano ||--o{ Assinatura : "define"
    Assinatura ||--o{ Pagamento : "gera"
```

---

## 📂 Estrutura de Pastas

```plaintext
FormaPRO/
├── BackEnd/               # API RESTful (NestJS + Prisma + PostgreSQL)
│   ├── prisma/            # Migrações e schema relacional do banco
│   ├── src/               # Módulos de negócio da aplicação
│   ├── .env.example       # Template de variáveis de ambiente
│   ├── package.json       # Dependências e scripts do backend
│   └── README.md          # Documentação detalhada da API
│
├── FrontEnd/              # Interface Web SPA (React + Vite + Bootstrap)
│   ├── public/            # Arquivos estáticos
│   ├── src/               # Componentes, páginas e serviços
│   ├── db.json            # Base mockada (JSON Server)
│   ├── package.json       # Dependências e scripts do frontend
│   └── vite.config.ts     # Configuração de build do Vite
│
├── .gitignore             # Regras de exclusão do Git para o monorepo
└── README.md              # Documentação principal do projeto
```

<details>
<summary><b>🔍 Detalhes da Estrutura do Back-End (<code>BackEnd/src/</code>)</b></summary>

| Módulo | Responsabilidade |
| :--- | :--- |
| `auth/` | Autenticação de usuários, login e geração de tokens JWT |
| `users/` | Cadastro e gerenciamento de perfis (Aluno, Instrutor, Admin) |
| `cursos/`, `modulo/`, `aulas/` | Gestão pedagógica, catálogo de cursos, módulos e aulas |
| `trilhas/`, `trilha-cursos/` | Trilhas de aprendizado e associação sequencial de cursos |
| `carreiras/`, `carreira-trilhas/` | Carreiras profissionais e vinculação de trilhas |
| `matriculas/`, `progresso-aulas/` | Inscrição de alunos e acompanhamento de progresso aula a aula |
| `certificados/` | Emissão e verificação de certificados com código de autenticidade |
| `planos/`, `assinaturas/`, `pagamentos/` | Planos de acesso, assinaturas ativas e transações |
| `prisma/` | Conexão e ciclo de vida do Prisma Client |

</details>

<details>
<summary><b>🔍 Detalhes da Estrutura do Front-End (<code>FrontEnd/src/</code>)</b></summary>

| Diretório | Responsabilidade |
| :--- | :--- |
| `pages/HomePages/` | Vitrine inicial com catálogo de cursos e trilhas |
| `pages/SalaAulaPages/` | Player de vídeo e grade curricular interativa |
| `pages/PainelAlunoPages/` | Dashboard do aluno com cursos em andamento e progresso |
| `pages/AdministracaoPages/` | Painel de controle e abas de gestão administrativa |
| `pages/MontadorCursoPages/` | Interface interativa para criação de cursos, módulos e aulas |
| `pages/CertificadoPages/` | Visualização e validação de certificados emitidos |
| `pages/PagamentoPages/` | Escolha de planos e fluxo de checkout |
| `components/` | Componentes compartilhados (Navbar, Footer, Modais) |
| `services/` | Instância do Axios (`api.ts`) com interceptors para tokens JWT |

</details>

---

## ⚙️ Como Executar o Projeto Localmente

### 📋 Pré-requisitos

Certifique-se de possuir instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão `18.x` ou superior recomendada)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (em execução localmente ou via container Docker)
- [Git](https://git-scm.com/)

---

### 1️⃣ Configurando e Rodando o Back-End

1. **Acesse a pasta do Back-End:**

   ```bash
   cd BackEnd
   ```
2. **Instale as dependências:**

   ```bash
   npm install
   ```
3. **Configure as Variáveis de Ambiente:**
   Copie o arquivo `.env.example` para criar seu arquivo `.env`:

   ```bash
   # Linux / macOS / Git Bash
   cp .env.example .env

   # Windows (PowerShell)
   Copy-Item .env.example .env
   ```
4. **Edite o arquivo `.env` com os dados do seu PostgreSQL e segredo JWT:**

   ```env
   DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/formapro_db?schema=public"
   PORT=3000
   JWT_SECRET="seu_jwt_secret_super_seguro_aqui"
   ```
5. **Execute as migrações e gere o Prisma Client:**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```
6. **Inicie o servidor NestJS:**

   ```bash
   # Modo de desenvolvimento com Hot-Reload
   npm run start:dev
   ```

O servidor da API estará disponível em: **`http://localhost:3000`**
A documentação interativa Swagger estará acessível em: **`http://localhost:3000/api`**

---

### 2️⃣ Configurando e Rodando o Front-End

1. **Abra outro terminal e acesse a pasta do Front-End:**

   ```bash
   cd FrontEnd
   ```
2. **Instale as dependências:**

   ```bash
   npm install
   ```
3. **Inicie a aplicação React com Vite:**

   ```bash
   npm run dev
   ```

A interface web estará disponível em: **`http://localhost:5173`** (ou porta indicada no terminal).

> 💡 **Dica (Modo Mock):** Caso queira rodar o front-end de forma desacoplada do banco utilizando a API simulada via JSON Server, execute em um terminal separado na pasta `FrontEnd`:
>
> ```bash
> npm run server
> ```
>
> A API simulada responderá em `http://localhost:3001`.

---

## 📑 Documentação Interativa (Swagger)

A API do FormaPRO conta com documentação interativa gerada automaticamente através do OpenAPI/Swagger.

Acesse: 👉 **[http://localhost:3000/api](http://localhost:3000/api)**

### 🔐 Como testar rotas protegidas no Swagger:

1. Registre um novo usuário através do endpoint `POST /users` ou utilize um usuário já existente.
2. Efetue login através do endpoint `POST /auth/login` informando `email` e `senha`.
3. Copie o `access_token` retornado na resposta.
4. Clique no botão verde **Authorize** no canto superior direito da página do Swagger.
5. Cole o token no campo de valor e clique em **Authorize**.
6. Agora todas as requisições protegidas serão autenticadas automaticamente!

---

## 🚀 Guia para Subir ao GitHub

Siga o passo a passo abaixo para inicializar o repositório e enviar todo o projeto para o seu GitHub:

### Passo 1: Limpar repositórios Git internos (caso existam)

Se a pasta `FrontEnd` ou `BackEnd` tiver um diretório oculto `.git` pré-existente, remova-o antes para que o Git considere todos os arquivos na raiz do monorepo:

```powershell
# No PowerShell na raiz do projeto (FormaPRO):
Remove-Item -Recurse -Force FrontEnd\.git -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force BackEnd\.git -ErrorAction SilentlyContinue
```

### Passo 2: Inicializar o Git na raiz do projeto

```bash
git init
```

### Passo 3: Adicionar e confirmar as alterações

```bash
# Adiciona todos os arquivos (o .gitignore evitará o envio de node_modules e .env)
git add .

# Cria o commit inicial
git commit -m "feat: projeto completo FormaPRO (Front-end e Back-end)"
```

### Passo 4: Conectar ao repositório remoto e enviar

Crie um novo repositório no seu GitHub (ex: `FormaPRO`) e execute:

```bash
# Define a branch principal como main
git branch -M main

# Conecta ao seu repositório remoto
git remote add origin https://github.com/<SEU_USUARIO>/<SEU_REPOSITORIO>.git

# Envia os arquivos para o GitHub
git push -u origin main
```

---

## 👥 Autores e Contexto Acadêmico

Projeto desenvolvido no âmbito da disciplina de **Técnicas de Construção de Software 2**, com foco na aplicação prática de padrões arquiteturais modernos, desenvolvimento full-stack, segurança da informação e modelagem relacional de dados.

- **Desenvolvedor**: [João Pedro Gomes](https://github.com/joaoxddx)
- **Curso**: Engenharia de Software

---

## 📄 Licença

Este projeto é disponibilizado para fins educacionais e de estudo. Consulte os arquivos de licença de cada submódulo para maiores detalhes.
