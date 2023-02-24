import { randomUUID } from "crypto";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function GetScheduleId(fastify: FastifyInstance) {
    fastify.post('/scheduled', async (request, reply) => {
        
        const createSchedule = z.object({
            horario: z.string(),
            dia: z.string(),
        })

        const scheduleId = z.object({
            id: z.string()
        })

        const {id} = scheduleId.parse(request.params)

        const getSchedule = await prisma.agenda.findMany({
            where: {
                id
            }
        })

        const {horario, dia} = createSchedule.parse(request.params)

        try {
            await prisma.agendado.create({
                data: {
                    id: randomUUID(),
                    agendadoId: randomUUID(),
                    
                    agenda: {
                        create: {
                            id,
                            horario,
                            dia
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