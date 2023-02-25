import {FastifyInstance} from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import {randomUUID} from 'node:crypto'

export async function RegisterService(fastify: FastifyInstance) {

    fastify.post('/service/register', async (request, reply) => {

        const createService = z.object({
            NomeServico: z.string(),
            preco: z.number(),
            descricao: z.string(),
            img: z.string(),
        })

        const categoryId = z.object({
            id: z.string(),
            CNPJ: z.string()
        })

        const { NomeServico, preco, descricao, img } = createService.parse(request.body)

        const { id, CNPJ } = categoryId.parse(request.params)
        
        try {
            await prisma.servico.create({
                data: {
                    id: randomUUID(),
                    NomeServico,
                    preco,
                    descricao,
                    img,
                    categoria: {
                        connect: {
                            id
                        }
                    },
                    Prestador: {
                        connect: {
                            CNPJ
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