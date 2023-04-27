-- CreateTable
CREATE TABLE "Cliente" (
    "CPF" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dateBirth" TEXT NOT NULL,
    "agendadoId" TEXT,
    "enderecoCep" TEXT,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("CPF")
);

-- CreateTable
CREATE TABLE "Prestador" (
    "CNPJ" TEXT NOT NULL,
    "Nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Senha" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "enderecoCep" TEXT,

    CONSTRAINT "Prestador_pkey" PRIMARY KEY ("CNPJ")
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" TEXT NOT NULL,
    "NomeServico" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "prestadorCNPJ" TEXT,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" TEXT NOT NULL,
    "nomeCategoria" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "servicoId" TEXT,
    "produtosId" TEXT,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgendaDia" (
    "id" TEXT NOT NULL,
    "dia" TEXT NOT NULL,
    "agendadoId" TEXT,

    CONSTRAINT "AgendaDia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgendaHorario" (
    "id" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "agendaId" TEXT,
    "agendaDiaId" TEXT,

    CONSTRAINT "AgendaHorario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgendaStatus" (
    "id" TEXT NOT NULL,
    "nomeStatus" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "agendadoId" TEXT,

    CONSTRAINT "AgendaStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agendado" (
    "id" TEXT NOT NULL,
    "clienteCPF" TEXT,

    CONSTRAINT "Agendado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produtos" (
    "id" TEXT NOT NULL,
    "nomeProduto" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "cep" TEXT NOT NULL,
    "numero" TEXT NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("cep")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_CPF_key" ON "Cliente"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Prestador_CNPJ_key" ON "Prestador"("CNPJ");

-- CreateIndex
CREATE UNIQUE INDEX "Prestador_email_key" ON "Prestador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Servico_id_key" ON "Servico"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_id_key" ON "Categoria"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Categoria_nomeCategoria_key" ON "Categoria"("nomeCategoria");

-- CreateIndex
CREATE UNIQUE INDEX "AgendaDia_id_key" ON "AgendaDia"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AgendaHorario_id_key" ON "AgendaHorario"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AgendaHorario_horario_key" ON "AgendaHorario"("horario");

-- CreateIndex
CREATE UNIQUE INDEX "AgendaStatus_id_key" ON "AgendaStatus"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AgendaStatus_nomeStatus_key" ON "AgendaStatus"("nomeStatus");

-- CreateIndex
CREATE UNIQUE INDEX "Agendado_id_key" ON "Agendado"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Produtos_id_key" ON "Produtos"("id");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_enderecoCep_fkey" FOREIGN KEY ("enderecoCep") REFERENCES "Endereco"("cep") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prestador" ADD CONSTRAINT "Prestador_enderecoCep_fkey" FOREIGN KEY ("enderecoCep") REFERENCES "Endereco"("cep") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_prestadorCNPJ_fkey" FOREIGN KEY ("prestadorCNPJ") REFERENCES "Prestador"("CNPJ") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria" ADD CONSTRAINT "Categoria_produtosId_fkey" FOREIGN KEY ("produtosId") REFERENCES "Produtos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgendaDia" ADD CONSTRAINT "AgendaDia_agendadoId_fkey" FOREIGN KEY ("agendadoId") REFERENCES "Agendado"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgendaHorario" ADD CONSTRAINT "AgendaHorario_agendaId_fkey" FOREIGN KEY ("agendaId") REFERENCES "Agendado"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgendaHorario" ADD CONSTRAINT "AgendaHorario_agendaDiaId_fkey" FOREIGN KEY ("agendaDiaId") REFERENCES "AgendaDia"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgendaStatus" ADD CONSTRAINT "AgendaStatus_agendadoId_fkey" FOREIGN KEY ("agendadoId") REFERENCES "Agendado"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendado" ADD CONSTRAINT "Agendado_clienteCPF_fkey" FOREIGN KEY ("clienteCPF") REFERENCES "Cliente"("CPF") ON DELETE SET NULL ON UPDATE CASCADE;
