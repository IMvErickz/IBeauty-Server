import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../../lib/prisma"

export async function GetProductId(fastify: FastifyInstance) {
    fastify.get('/product/:id', async (request) => {
        const nameProduct = z.object({
            id: z.string()
        })

        const { id } = nameProduct.parse(request.body)
        
        try {
           const product = await prisma.produtos.findMany({
                where: {
                    id
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
            
            return {product}
        } catch (error) {
            throw error
        }
    })
}