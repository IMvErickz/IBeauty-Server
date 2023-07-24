import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { randomUUID } from "crypto";
import { z } from "zod";

export async function PastService(fastify: FastifyInstance) {
    fastify.post('/past', async (request, response) => {

        const pastSchema = z.object({
            clientCPF: z.string(),
            paymentId: z.string(),
            serviceId: z.string(),
        })

        const { clientCPF, paymentId, serviceId } = pastSchema.parse(request.body)

        try {
            await prisma.pastServices.create({
                data: {
                    id: randomUUID(),
                    clientCPF,
                    paymentId,
                    serviceId
                }
            })

            response.status(201).send('sucess')
        } catch (err) {
            throw err
        }
    })
}