import { randomUUID } from "crypto";
import { prisma } from "../server/lib/prisma";

async function Seed() {
    await prisma.provider.update({
        where: {
            CNPJ: '40795968000182'
        },
        data: {
            img: 'https://graces.com.br/wp-content/uploads/2019/02/o-que-nao-pode-faltar-na-sua-barbearia-equipamentos.jpg'
        }
    })
}

Seed()