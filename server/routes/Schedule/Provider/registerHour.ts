import {FastifyInstance} from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { randomUUID } from 'node:crypto'

  

export async function RegisterHour(fastify: FastifyInstance) {

    fastify.post('/hour/:DayId', async (request, reply) => {

        const createSchedule = z.object({
            horario: z.string(),
        })

        const dayId = z.object({
            DayId: z.string()
        })
       
        const { horario } = createSchedule.parse(request.body)
        const {DayId} = dayId.parse(request.params)
        
        try {
            await prisma.agendaHorario.create({
                data: {
                    id: randomUUID(),
                    horario,
                    AgendaDia: {
                        connect: {
                            id: DayId
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