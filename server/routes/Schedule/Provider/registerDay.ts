import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function RegisterDay(fastify: FastifyInstance) {
    fastify.post('/day/:CNPJ', async (request, reply) => {
        const days = z.object({
            day: z.string()
        })
        const providerSchema = z.object({
            CNPJ: z.string()
        })

        const {CNPJ} = providerSchema.parse(request.params)

        const { day } = days.parse(request.body)
        
        await prisma.scheduleDay.create({
            data: {
                id: randomUUID(),
                day,
                Provider: {
                    connect: {
                        CNPJ
                    }
                }
            },
        })

        reply.status(201).send()
    })
}