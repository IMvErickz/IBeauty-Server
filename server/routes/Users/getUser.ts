import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function GetUser(fastify: FastifyInstance) {
    fastify.get('/user', async (request, reply) => {
        const getUser = z.object({
            CPF: z.string(),
            email: z.string(),
        })

        const { CPF } = getUser.parse(request.body)
        const { email } = getUser.parse(request.params)
        
        try {
            await prisma.client.findUnique({
                where: {
                    CPF,
                    email,
                }
            })
        } catch (error) {
            throw error
        }

        return reply.status(201).send()
    })
}