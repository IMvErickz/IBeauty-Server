import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function GetProvider(fastify: FastifyInstance) {
    fastify.get('/provider', async () => {
        const provider = await prisma.provider.findMany()

        return {provider}
    })
}