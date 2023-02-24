import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function GetService(fastify: FastifyInstance) {
    fastify.get('/services', async () => {
        const getAllServices = await prisma.servico.findMany()

        return {getAllServices}
    })
}