import {FastifyInstance} from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { randomUUID } from 'node:crypto'

  

export async function RegisterSchedule(fastify: FastifyInstance) {

    const createSchedule = z.object({
        horario: z.string(),
        dia: z.string(),
    })

    fastify.post('/createSchedule', async (request, reply) => {
       

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

    fastify.get('/getAllSchedule', async () => {
        const getAllSchedule = await prisma.agenda.findMany()

        return {getAllSchedule}
    })

    const createStatus = z.object({
            nomeStatus: z.string(),
            descricao: z.string(),
            statusId: z.string(),
        })

    fastify.post('/createStatus', async (request, reply) => {
        

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

    fastify.post('/scheduled', async (request, reply) => {

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

    fastify.get('/getAllScheduled', async () => {
        const allScheduled = await prisma.agendado.findMany()

        return {allScheduled}
    })
}