import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function UpdateProducts(fastify: FastifyInstance) {
    fastify.put('/updateProducts/:id', async (request, response) => {
        const product = z.object({
            Name: z.string(),
            price: z.string(),
            description: z.string(),
            img: z.string(),
        })

        const { description, img, Name, price } = product.parse(request.body)
        
        const productId = z.object({
            id: z.string()
        })

        const { id } = productId.parse(request.params)
        
        try {
            await prisma.products.update({
                where: {
                    id
                },
                data: {
                    Name,
                    price,
                    description,
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