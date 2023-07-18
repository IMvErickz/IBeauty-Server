import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export async function Payment(fastify: FastifyInstance) {
    fastify.post('/payment/:id', async (request, reply) => {

        const paySchema = z.object({
            Method: z.string(),
            createdAt: z.string(),
        })

        const { Method, createdAt } = paySchema.parse(request.body)

        try {
            await prisma.payment.create({
                data: {
                    id: randomUUID(),
                    Method,
                    createdAt
                }
            })
        } catch (err) {
            throw err
        }
    })
}