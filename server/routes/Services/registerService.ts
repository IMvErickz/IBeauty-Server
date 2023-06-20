import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import { randomUUID } from 'node:crypto'

export async function RegisterService(fastify: FastifyInstance) {

    fastify.post('/service/register', async (request, reply) => {

        const createService = z.object({
            NameService: z.string(),
            price: z.string(),
            description: z.string(),
            img: z.string(),
        })

        const categoryId = z.object({
            category: z.string(),
            CNPJ: z.string()
        })

        const { NameService, price, description, img } = createService.parse(request.body)

        const { category, CNPJ } = categoryId.parse(request.body)

        try {
            await prisma.service.create({
                data: {
                    id: randomUUID(),
                    NameService,
                    price,
                    description,
                    img,
                    Category: {
                        connect: {
                            id: category
                        }
                    },
                    Provider: {
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