import {FastifyInstance} from 'fastify'
import { z } from 'zod'
import {prisma} from '../../lib/prisma'

export async function RegisterProducts(fastify: FastifyInstance) {
    fastify.post('/createProduct', async (request, reply) => {
        const createProduct = z.object({
            id: z.string(),
            Name: z.string(),
            price: z.string(),
            description: z.string(),
            img: z.string(),
            Rating: z.number()
        })

        const { id, Name, price, description, img, Rating } = createProduct.parse(request.body)
        
        try {
            await prisma.products.create({
            data: {
                id,
                Name,
                description,
                price,
                img,
                Rating
            }
        })
        } catch (error) {
            throw error
        }

        return reply.status(201).send()
    })
}