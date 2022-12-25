import {FastifyInstance} from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import {randomUUID} from 'node:crypto'

export async function RegisterSchedule(fastify: FastifyInstance) {
    fastify.post('/createSchedule', async (request, reply) => {
        const createSchedule = z.object({
        horario: z.date(),
        dia: z.string(),
        agendaId: z.string()
        
    })

        const { horario, dia, agendaId } = createSchedule.parse(request.body)
        
        try {
            await prisma.agenda.create({
                data: {
                    id: randomUUID(),
                    horario,
                    dia,
                    agendaId
                }
            })
        } catch (error) {
            throw error
        }

        return reply.status(201).send()
    })

    fastify.get('/getAllSchedule', async () => {
        const getAllSchedule = await prisma.agenda.findMany()

        return {getAllSchedule}
    })

    fastify.post('/createStatus', async (request, reply) => {
        const createStatus = z.object({
            nomeStatus: z.string(),
            descricao: z.string(),
            statusId: z.string(),
        })

        const { nomeStatus, descricao, statusId} = createStatus.parse(request.body)

        try {
            await prisma.agendaStatus.create({
                data: {
                    id: randomUUID(),
                    nomeStatus,
                    descricao,
                    statusId
                }
            })
        } catch (error) {
            throw error
        }

        return reply.status(201).send()
    })
}