import {FastifyInstance} from 'fastify'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { randomUUID } from 'node:crypto'

  

export async function RegisterHour(fastify: FastifyInstance) {

    fastify.post('/hour/:DayId', async (request, reply) => {

        const createSchedule = z.object({
            hour: z.string(),
        })

        const dayId = z.object({
            DayId: z.string()
        })
       
        const { hour } = createSchedule.parse(request.body)
        const {DayId} = dayId.parse(request.params)
        
        try {
            await prisma.scheduleHour.create({
                data: {
                    id: randomUUID(),
                    hour,
                    ScheduleDay: {
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