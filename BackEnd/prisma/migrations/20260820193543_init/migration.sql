-- CreateTable
CREATE TABLE "usuarios" (
    "ID_Usuario" SERIAL NOT NULL,
    "NomeCompleto" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "SenhaHash" TEXT NOT NULL,
    "DataCadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Role" TEXT NOT NULL DEFAULT 'student',

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("ID_Usuario")
);

-- CreateTable
CREATE TABLE "categorias" (
    "ID_Categoria" SERIAL NOT NULL,
    "Nome" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("ID_Categoria")
);

-- CreateTable
CREATE TABLE "cursos" (
    "ID_Curso" SERIAL NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,
    "ID_Instrutor" INTEGER NOT NULL,
    "ID_Categoria" INTEGER NOT NULL,
    "Nivel" TEXT NOT NULL,
    "DataPublicacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "TotalAulas" INTEGER NOT NULL DEFAULT 0,
    "TotalHoras" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ImgUrl" TEXT,

    CONSTRAINT "cursos_pkey" PRIMARY KEY ("ID_Curso")
);

-- CreateTable
CREATE TABLE "modulos" (
    "ID_Modulo" SERIAL NOT NULL,
    "ID_Curso" INTEGER NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Ordem" INTEGER NOT NULL,

    CONSTRAINT "modulos_pkey" PRIMARY KEY ("ID_Modulo")
);

-- CreateTable
CREATE TABLE "aulas" (
    "ID_Aula" SERIAL NOT NULL,
    "ID_Modulo" INTEGER NOT NULL,
    "Titulo" TEXT NOT NULL,
    "TipoConteudo" TEXT NOT NULL,
    "URL_Conteudo" TEXT NOT NULL,
    "DuracaoMinutos" INTEGER NOT NULL,
    "Ordem" INTEGER NOT NULL,

    CONSTRAINT "aulas_pkey" PRIMARY KEY ("ID_Aula")
);

-- CreateTable
CREATE TABLE "matriculas" (
    "ID_Matricula" SERIAL NOT NULL,
    "ID_Usuario" INTEGER NOT NULL,
    "ID_Curso" INTEGER NOT NULL,
    "DataMatricula" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DataConclusao" TIMESTAMP(3),

    CONSTRAINT "matriculas_pkey" PRIMARY KEY ("ID_Matricula")
);

-- CreateTable
CREATE TABLE "progresso_aulas" (
    "ID_Usuario" INTEGER NOT NULL,
    "ID_Aula" INTEGER NOT NULL,
    "DataConclusao" TIMESTAMP(3),
    "Status" TEXT NOT NULL DEFAULT 'pendente',

    CONSTRAINT "progresso_aulas_pkey" PRIMARY KEY ("ID_Usuario","ID_Aula")
);

-- CreateTable
CREATE TABLE "avaliacoes" (
    "ID_Avaliacao" SERIAL NOT NULL,
    "ID_Usuario" INTEGER NOT NULL,
    "ID_Curso" INTEGER NOT NULL,
    "Nota" DOUBLE PRECISION NOT NULL,
    "Comentario" TEXT,
    "DataAvaliacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "avaliacoes_pkey" PRIMARY KEY ("ID_Avaliacao")
);

-- CreateTable
CREATE TABLE "trilhas" (
    "ID_Trilha" SERIAL NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,
    "ID_Categoria" INTEGER NOT NULL,

    CONSTRAINT "trilhas_pkey" PRIMARY KEY ("ID_Trilha")
);

-- CreateTable
CREATE TABLE "trilha_cursos" (
    "ID_Trilha" INTEGER NOT NULL,
    "ID_Curso" INTEGER NOT NULL,
    "Ordem" INTEGER NOT NULL,

    CONSTRAINT "trilha_cursos_pkey" PRIMARY KEY ("ID_Trilha","ID_Curso")
);

-- CreateTable
CREATE TABLE "certificados" (
    "ID_Certificado" SERIAL NOT NULL,
    "ID_Usuario" INTEGER NOT NULL,
    "ID_Curso" INTEGER,
    "ID_Trilha" INTEGER,
    "CodigoVerificacao" TEXT NOT NULL,
    "DataEmissao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "certificados_pkey" PRIMARY KEY ("ID_Certificado")
);

-- CreateTable
CREATE TABLE "planos" (
    "ID_Plano" SERIAL NOT NULL,
    "Nome" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,
    "Preco" DOUBLE PRECISION NOT NULL,
    "DuracaoMeses" INTEGER NOT NULL,

    CONSTRAINT "planos_pkey" PRIMARY KEY ("ID_Plano")
);

-- CreateTable
CREATE TABLE "assinaturas" (
    "ID_Assinatura" SERIAL NOT NULL,
    "ID_Usuario" INTEGER NOT NULL,
    "ID_Plano" INTEGER NOT NULL,
    "DataInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "DataFim" TIMESTAMP(3),

    CONSTRAINT "assinaturas_pkey" PRIMARY KEY ("ID_Assinatura")
);

-- CreateTable
CREATE TABLE "pagamentos" (
    "ID_Pagamento" SERIAL NOT NULL,
    "ID_Assinatura" INTEGER NOT NULL,
    "ValorPago" DOUBLE PRECISION NOT NULL,
    "DataPagamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "MetodoPagamento" TEXT NOT NULL,
    "Id_Transacao_Gateway" TEXT NOT NULL,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("ID_Pagamento")
);

-- CreateTable
CREATE TABLE "carreiras" (
    "ID_Carreira" SERIAL NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Descricao" TEXT NOT NULL,

    CONSTRAINT "carreiras_pkey" PRIMARY KEY ("ID_Carreira")
);

-- CreateTable
CREATE TABLE "carreira_trilhas" (
    "ID_Carreira" INTEGER NOT NULL,
    "ID_Trilha" INTEGER NOT NULL,
    "Ordem" INTEGER NOT NULL,

    CONSTRAINT "carreira_trilhas_pkey" PRIMARY KEY ("ID_Carreira","ID_Trilha")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_Email_key" ON "usuarios"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "matriculas_ID_Usuario_ID_Curso_key" ON "matriculas"("ID_Usuario", "ID_Curso");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_CodigoVerificacao_key" ON "certificados"("CodigoVerificacao");

-- AddForeignKey
ALTER TABLE "cursos" ADD CONSTRAINT "cursos_ID_Instrutor_fkey" FOREIGN KEY ("ID_Instrutor") REFERENCES "usuarios"("ID_Usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cursos" ADD CONSTRAINT "cursos_ID_Categoria_fkey" FOREIGN KEY ("ID_Categoria") REFERENCES "categorias"("ID_Categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulos" ADD CONSTRAINT "modulos_ID_Curso_fkey" FOREIGN KEY ("ID_Curso") REFERENCES "cursos"("ID_Curso") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aulas" ADD CONSTRAINT "aulas_ID_Modulo_fkey" FOREIGN KEY ("ID_Modulo") REFERENCES "modulos"("ID_Modulo") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriculas" ADD CONSTRAINT "matriculas_ID_Usuario_fkey" FOREIGN KEY ("ID_Usuario") REFERENCES "usuarios"("ID_Usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriculas" ADD CONSTRAINT "matriculas_ID_Curso_fkey" FOREIGN KEY ("ID_Curso") REFERENCES "cursos"("ID_Curso") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progresso_aulas" ADD CONSTRAINT "progresso_aulas_ID_Usuario_fkey" FOREIGN KEY ("ID_Usuario") REFERENCES "usuarios"("ID_Usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progresso_aulas" ADD CONSTRAINT "progresso_aulas_ID_Aula_fkey" FOREIGN KEY ("ID_Aula") REFERENCES "aulas"("ID_Aula") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_ID_Usuario_fkey" FOREIGN KEY ("ID_Usuario") REFERENCES "usuarios"("ID_Usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_ID_Curso_fkey" FOREIGN KEY ("ID_Curso") REFERENCES "cursos"("ID_Curso") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilhas" ADD CONSTRAINT "trilhas_ID_Categoria_fkey" FOREIGN KEY ("ID_Categoria") REFERENCES "categorias"("ID_Categoria") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilha_cursos" ADD CONSTRAINT "trilha_cursos_ID_Trilha_fkey" FOREIGN KEY ("ID_Trilha") REFERENCES "trilhas"("ID_Trilha") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilha_cursos" ADD CONSTRAINT "trilha_cursos_ID_Curso_fkey" FOREIGN KEY ("ID_Curso") REFERENCES "cursos"("ID_Curso") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_ID_Usuario_fkey" FOREIGN KEY ("ID_Usuario") REFERENCES "usuarios"("ID_Usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_ID_Curso_fkey" FOREIGN KEY ("ID_Curso") REFERENCES "cursos"("ID_Curso") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_ID_Trilha_fkey" FOREIGN KEY ("ID_Trilha") REFERENCES "trilhas"("ID_Trilha") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assinaturas" ADD CONSTRAINT "assinaturas_ID_Usuario_fkey" FOREIGN KEY ("ID_Usuario") REFERENCES "usuarios"("ID_Usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assinaturas" ADD CONSTRAINT "assinaturas_ID_Plano_fkey" FOREIGN KEY ("ID_Plano") REFERENCES "planos"("ID_Plano") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_ID_Assinatura_fkey" FOREIGN KEY ("ID_Assinatura") REFERENCES "assinaturas"("ID_Assinatura") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carreira_trilhas" ADD CONSTRAINT "carreira_trilhas_ID_Carreira_fkey" FOREIGN KEY ("ID_Carreira") REFERENCES "carreiras"("ID_Carreira") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carreira_trilhas" ADD CONSTRAINT "carreira_trilhas_ID_Trilha_fkey" FOREIGN KEY ("ID_Trilha") REFERENCES "trilhas"("ID_Trilha") ON DELETE CASCADE ON UPDATE CASCADE;
