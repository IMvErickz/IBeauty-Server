import { randomUUID } from "crypto";
import { prisma } from "../server/lib/prisma";

async function Seed() {
    await prisma.produtos.create({
        data: {
            id: randomUUID(),
            nomeProduto: 'Shampoo Anti-Caspa',
            preco: "28,50",
            descricao: "Shampoo Anti-Caspa para todas as idades",
            img: "https://www.farmaciaazuleno.com.br/wp-content/uploads/SHAMPOO-ANTICASPA-200ML.jpg"
        }
    })
}

Seed()