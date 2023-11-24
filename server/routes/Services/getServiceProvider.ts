import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function GetProviderService(fastify: FastifyInstance) {
    fastify.get('/services/:id', async (request) => {

        const provider = z.object({
            id: z.string()
        })

        const { id } = provider.parse(request.params)

        const services = await prisma.provider.findMany({
            where: {
                id
            },

            select: {
                Name: true,
                img: true,
                Service: {
                    select: {
                        NameService: true,
                        Category: true,
                        price: true,
                        description: true,
                        img: true,
                        id: true
                    }
                }
            }
        })
        return { services }

    })

}