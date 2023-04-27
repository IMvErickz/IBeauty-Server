import { randomUUID } from "crypto";
import { prisma } from "../server/lib/prisma";

async function Seed() {
    await prisma.categoria.create({
        data: {
            id: randomUUID(),
            nomeCategoria: "Cabelo Feminino",
            descricao: "Todo tipo de cabelo feminino"
        }
    })
}

Seed()