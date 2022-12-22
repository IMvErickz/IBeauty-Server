import {FastifyInstance} from 'fastify'
import { get } from 'https'
import { z } from 'zod'
import {prisma} from '../lib/prisma'

export async function RegisterService(fastify: FastifyInstance) {

    fastify.post('/registerService', async (request, reply) => {

        const createService = z.object({
            id: z.string(),
            NomeServico: z.string(),
            preco: z.number(),
            descricao: z.string(),
            img: z.string(),
            servicoId: z.string(),
        })

        const { id, NomeServico, preco, descricao, img, servicoId } = createService.parse(request.body)
        
        try {
            await prisma.servico.create({
                data: {
                    id,
                    NomeServico,
                    preco,
                    descricao,
                    img,
                    servicoId,
                }
        })
        } catch (error) {
            throw error
        }

        return reply.status(201).send()
    })

    fastify.get('/allServices', async () => {
        const getAllServices = await prisma.servico.findMany()

        return {getAllServices}
    })

    fastify.get('/getServiceName', async (request, reply) => {
        const serviceName = z.object({
            NomeServico: z.string()
        })

        const {NomeServico} = serviceName.parse(request.body)
        
        try {
            await prisma.servico.findMany({
                where: {
                    NomeServico
                }
            })
        } catch (error) {
            throw error
        }

        return reply.status(201).send()
    })
}