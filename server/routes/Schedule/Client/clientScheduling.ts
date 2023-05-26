import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";

export async function GetSchedule(fastify: FastifyInstance) {
    fastify.get('/scheduled', async () => {
        const allScheduled = await prisma.agendado.findMany()

        return {allScheduled}
    })
}