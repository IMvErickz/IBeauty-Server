import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function GetUserById(fastify: FastifyInstance) {
    fastify.get('/user/:id', async (request) => {
        const userId = z.object({
            id: z.string()
        })

        const { id } = userId.parse(request.params)
        
        const user = await prisma.client.findUnique({
            where: {
                id
            }
        })

        return user
    })
}