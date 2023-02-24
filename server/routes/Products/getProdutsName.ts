import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../../lib/prisma"

export async function GetProductsName(fastify: FastifyInstance) {
    fastify.get('/product/:nomeProduto', async (request, reply) => {
        const nameProduct = z.object({
            nomeProduto: z.string()
        })

        const { nomeProduto } = nameProduct.parse(request.body)
        
        try {
           await prisma.produtos.findMany({
                where: {
                    nomeProduto
               },
               select: {
                   nomeProduto: true,
                   descricao: true,
                   preco: true,
                   categoria: {
                       select: {
                           nomeCategoria: true,
                       }
                   }
               }
            })
        } catch (error) {
            throw error
        }

        return reply.status(201).send
    })
}