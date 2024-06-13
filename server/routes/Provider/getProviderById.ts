import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function GetProviderById(fastify: FastifyInstance) {
    fastify.get('/provider/:id', async (request) => {
        const providerId = z.object({
            id: z.string()
        })

        const { id } = providerId.parse(request.params)
        
        const provider = await prisma.provider.findUnique({
            where: {
                id
            }
        })

        return provider
    })
}