import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function UpdateProducts(fastify: FastifyInstance) {
    fastify.put('/updateProducts/:id', async (request, response) => {
        const product = z.object({
            nomeProduto: z.string(),
            preco: z.string(),
            descricao: z.string(),
            img: z.string(),
        })

        const { descricao, img, nomeProduto, preco } = product.parse(request.body)
        
        const productId = z.object({
            id: z.string()
        })

        const { id } = productId.parse(request.params)
        
        try {
            await prisma.produtos.update({
                where: {
                    id
                },
                data: {
                    nomeProduto,
                    preco,
                    descricao,
                    img
                }
            })
        } catch (error) {
            console.log(error)
            throw error
        }

        return response.status(201).send("Sucess")
    })
}