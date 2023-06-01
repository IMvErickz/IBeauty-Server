import { randomUUID } from "crypto";
import { prisma } from "../server/lib/prisma";

async function Seed() {
    await prisma.provider.deleteMany()
    await prisma.service.deleteMany()
}

Seed()