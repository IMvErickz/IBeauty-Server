import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function GetStatus(fastify: FastifyInstance) {
    fastify.get('/status', async () => {
        const status = await prisma.agendaStatus.findMany()

        return {status}
   })
}