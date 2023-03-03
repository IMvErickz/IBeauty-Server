import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function GetScheduleId(fastify: FastifyInstance) {
    fastify.post('/scheduled/create', async (request, reply) => {
        
        const dayId = z.object({
            DayId: z.string()
        })

        const user = z.object({
            CPF: z.string()
        })

        const status = z.object({
            IdStatus: z.string()
        })

        const {IdStatus} = status.parse(request.body)

        const {CPF} = user.parse(request.body)

        const {DayId} = dayId.parse(request.body)

        try {
            await prisma.agendado.create({
                data: {
                    id: randomUUID(),
                    Cliente: {
                        connect: {
                            CPF
                        }
                    },
                    agenda: {
                        connect: {
                            id: DayId
                        }
                    },
                    status: {
                        connect: {
                            id: IdStatus
                        }
                    }
                }
            })
        } catch (error) {
            throw error
        }

        return reply.status(201).send()
    })

    fastify.get('/user/scheduled', async () => {
        const schedule = await prisma.agendado.findMany({
            include: {
                Cliente: true,
                agenda: true,
                status: true,
                AgendaHorario: true

            }
        })

        return {schedule}
    })
}