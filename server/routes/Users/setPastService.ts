import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { randomUUID } from "crypto";
import { z } from "zod";

export async function SetPastService(fastify: FastifyInstance) {
    fastify.post('/pastService', async (req, res) => {

        const pastServiceSchema = z.object({
            clientCPF: z.string(),
            serviceId: z.string(),
        })

        const {clientCPF,serviceId} = pastServiceSchema.parse(req.body)

        try {
            await prisma.pastServices.create({
                data: {
                    id: randomUUID(),
                    clientCPF,
                    serviceId,
                }
            })

            res.status(201).send()
        } catch (err) {
            res.status(500).send()
            throw err
        }
    })
}