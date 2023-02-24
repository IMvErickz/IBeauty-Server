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

    fastify.get('/getAllProducts', async () => {
        const getAllProducts = await prisma.produtos.findMany()

        return {getAllProducts}
    })

    fastify.get('/getProductName', async (request, reply) => {
        const nameProduct = z.object({
            nomeProduto: z.string()
        })

        const { nomeProduto } = nameProduct.parse(request.body)
        
        try {
           await prisma.produtos.findMany({
                where: {
                    nomeProduto
                }
            })
        } catch (error) {
            throw error
        }

        return reply.status(201).send
    })
}