import {FastifyInstance} from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { randomUUID } from 'node:crypto'

  

export async function RegisterSchedule(fastify: FastifyInstance) {

    fastify.post('/schedule/register', async (request, reply) => {

        const createSchedule = z.object({
            horario: z.string(),
            dia: z.string(),
        })
       
        const { horario, dia } = createSchedule.parse(request.body)
        
        try {
            await prisma.agenda.create({
                data: {
                    id: randomUUID(),
                    horario,
                    dia,
                    agendaId: randomUUID()
                }
            })
        } catch (error) {
            throw error
        }

        return reply.status(201).send()
    })
}