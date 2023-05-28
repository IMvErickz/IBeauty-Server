import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function GetServiceId(fastify: FastifyInstance) {
    fastify.get('/service/:id', async (request) => {
        const serviceName = z.object({
            id: z.string()
        })

        const {id} = serviceName.parse(request.params)
        
        try {
           const service = await prisma.service.findMany({
                where: {
                    id
                },
                select: {
                    NameService: true,
                    price: true,
                    description: true,
                    img: true,
                    Category: {
                        select: {
                            NameCategory: true
                        }
                    },
                    Provider: {
                        select: {
                            Name: true,
                        }
                    }
                }
           })
            
            return {service}
        } catch (error) {
            throw error
        }
    })
}