import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function GetProvider(fastify: FastifyInstance) {
    fastify.get('/provider', async () => {
        const provider = await prisma.prestador.findMany()

        return {provider}
    })
}