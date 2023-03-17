import { randomUUID } from "crypto";
import { prisma } from "../server/lib/prisma";

async function Seed() {
    await prisma.produtos.create({
        data: {
            id: randomUUID(),
            nomeProduto: "Loção pós-barba",
            descricao: "Perfeito para um viking",
            preco: 25.6,
            img: "https://images.tcdn.com.br/img/img_prod/491336/locao_pos_barba_tradition_viking_100_ml_56_1_20180611102901.jpg"
        },
    })

    await prisma.categoria.create({
        data: {
            id: randomUUID(),
            nomeCategoria: "Cabelo em geral",
            descricao: "Tudo relacionado a cabelo"
        }
    })
}

Seed()