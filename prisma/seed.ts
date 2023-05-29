import { randomUUID } from "crypto";
import { prisma } from "../server/lib/prisma";

async function Seed() {
    await prisma.category.create({
        data: {
            id: randomUUID(),
            NameCategory: "Cabeleireiro",
            description: "Salão focado no público masculino"
        }
    })

    await prisma.category.create({
        data: {
            id: randomUUID(),
            NameCategory: "Cabeleireira",
            description: "Salão focado no público feminino"
        }
    })

    await prisma.category.create({
        data: {
            id: randomUUID(),
            NameCategory: "Salão de beleza",
            description: "Salão focado no público feminino"
        }
    })
}

Seed()