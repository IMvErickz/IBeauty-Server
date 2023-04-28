import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function GetAllUSers(fastify: FastifyInstance) {
    fastify.get('/users', async () => {
        const users = await prisma.cliente.findMany()

        return {users}
    })
}