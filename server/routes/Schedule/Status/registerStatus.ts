import { randomUUID } from "crypto"
import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../../../lib/prisma"

export async function RegisterStatus(fastify: FastifyInstance) {
    fastify.post('/status/register', async (request, reply) => {
        
        const createStatus = z.object({
            nomeStatus: z.string(),
            descricao: z.string(),
            statusId: z.string(),
        })

        const scheduledId = z.object({
            id: z.string()
        })

        const { nomeStatus, descricao } = createStatus.parse(request.body)
        const { id } = scheduledId.parse(request.params)

        try {
            await prisma.agendaStatus.create({
                data: {
                    id: randomUUID(),
                    nomeStatus,
                    descricao,
                    Agendado: {
                        connect: {
                            id
                        }
                    }
                }
            })
        } catch (error) {
            throw error
        }

        return reply.status(201).send()
    })
}