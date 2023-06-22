import { randomUUID } from "crypto";
import { prisma } from "../server/lib/prisma";

async function Seed() {
    await prisma.category.create({
        data: {
            id: randomUUID(),
            NameCategory: "Teste",
            description: "testando..."
        }
    })
}

Seed()