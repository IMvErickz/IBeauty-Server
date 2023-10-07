import { prisma } from "../../lib/prisma";
import { FastifyInstance } from 'fastify'
import { randomUUID } from "node:crypto";
import { z } from "zod";

export async function RegistrerUserRoute(fastify: FastifyInstance) {
    fastify.post('/user/register', async (request, reply) => {
        const createUser = z.object({
            CPF: z.string(),
            Name: z.string(),
            email: z.string().email(),
            Password: z.string(),
            cellNumber: z.string(),
            cep: z.string(),
            number: z.string(),
            dateBirth: z.string(),
            img: z.string()

        })

        const { CPF, Name, email, Password, cep, number, cellNumber, dateBirth, img } = createUser.parse(request.body)

        try {
            await prisma.client.create({
                data: {
                    id: randomUUID(),
                    email,
                    Name,
                    Password,
                    img,
                    cellNumber,
                    CPF,
                    dateBirth,
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