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

        const serviceSchema = z.object({
            id: z.string()
        })

        const { Method, createdAt } = paySchema.parse(request.body)

        const { id } = serviceSchema.parse(request.params)

        try {
            await prisma.payment.create({
                data: {
                    id: randomUUID(),
                    Method,
                    createdAt,
                    service: {
                        connect: {
                            id
                        }
                    }
                }
            })
            reply.status(201).send()
        } catch (err) {
            throw err
        }
    })
}