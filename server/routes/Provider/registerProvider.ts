import { z } from 'zod'
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto';

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
        })

        const { CNPJ, Name, email, Password, img, cellNumber, cep, number } = registerProvider.parse(request.body)

        try {
            await prisma.provider.create({
                data: {
                    id: randomUUID(),
                    CNPJ,
                    Name,
                    email,
                    Password,
                    img,
                    cellNumber,
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