import { z } from 'zod'
import { prisma } from "../../lib/prisma";
import {FastifyInstance} from 'fastify'

export async function ResgiterProvider(fastify: FastifyInstance) {
    fastify.post('/provider/register', async (request, reply) => {
        const registerProvider = z.object({
            CNPJ: z.string(),
            Name: z.string(),
            email: z.string().email(),
            Password: z.string(),
            img: z.string(),
            cellNumber: z.string(),
            cep: z.string(),
            number: z.string(),
            Rating: z.number()
        })

        const { CNPJ, Name, email, Password, img, cellNumber, cep, number, Rating } = registerProvider.parse(request.body)
        
        try {
            await prisma.provider.create({
                data: {
                    CNPJ,
                    Name,
                    email,
                    Password,
                    img,
                    cellNumber,
                    Rating,
                    Address: {
                        create: {
                            cep,
                            number
                        }
                    }
                }
            })
        } catch (error) {
            console.log(error)
            throw error
        }

        return reply.status(201).send()
    })
}