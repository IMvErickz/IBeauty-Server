import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function RegisterDay(fastify: FastifyInstance) {
    fastify.post('/day/register', async (request, reply) => {
        const days = z.object({
            dia: z.string()
        })

        const { dia } = days.parse(request.body)
        
        await prisma.agendaDia.create({
            data: {
                id: randomUUID(),
                dia
            }
        })

        reply.status(201).send()
    })

    fastify.get('/days/hours', async () => {
        const days = await prisma.agendaDia.findMany({
            include: {
                horario: true
            }
        })

        return {days}
    })
}