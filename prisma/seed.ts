import { randomUUID } from "crypto";
import { prisma } from "../server/lib/prisma";

async function Seed() {
    await prisma.service.update({
        where: {
            id: '4ebc7532-2d9b-408a-bbea-31a503ef44f8'
        },
        data: {
            img: "https://www.segredosdesalao.com.br/dw/image/v2/AAFM_PRD/on/demandware.static/-/Sites-segredosdesalao-br-Library/default/dw2520b93c/images/blog/blog-article/247194-esta-pensando-em-adotar-um-corte-fade-c-orig-3.jpg?sw=480&q=70"
        }
    })
}

Seed()