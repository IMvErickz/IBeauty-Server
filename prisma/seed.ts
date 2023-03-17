import { randomUUID } from "crypto";
import { prisma } from "../server/lib/prisma";

async function Seed() {
    await prisma.produtos.create({
        data: {
            id: randomUUID(),
            nomeProduto: "Shampoo anti-caspa",
            descricao: "Shampoo extra forte",
            preco: 39.9,
            img: "https://res.cloudinary.com/beleza-na-web/image/upload/w_1500,f_auto,fl_progressive,q_auto:eco,w_800/v1/imagens/products/89962/4.png"
        }
    })
}

Seed()