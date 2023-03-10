import {FastifyInstance} from 'fastify'
import { z } from 'zod'
import {prisma} from '../../lib/prisma'

export async function RegisterProducts(fastify: FastifyInstance) {
    fastify.post('/createProduct', async (request, reply) => {
        const createProduct = z.object({
            id: z.string(),
            nomeProduto: z.string(),
            preco: z.number(),
            descricao: z.string(),
        })

        const { id, nomeProduto, preco, descricao } = createProduct.parse(request.body)
        
        try {
            await prisma.produtos.create({
            data: {
                id,
                nomeProduto,
                descricao,
                preco
            }
        })
        } catch (error) {
            throw error
        }

        return reply.status(201).send()
    })
}