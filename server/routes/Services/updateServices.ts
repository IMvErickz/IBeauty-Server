import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function UpdateService(fastify: FastifyInstance) {
    fastify.put('/updateService/:id', async (request, response) => {

        const data = z.object({
            NameService: z.string(),
            img: z.string(),
            price: z.string(),
            description: z.string()
        })

        const { NameService, description, img, price } = data.parse(request.body)
        
        const idService = z.object({
            id: z.string()
        })

        const {id} = idService.parse(request.params)

        try {
            const service = await prisma.service.update({
                where: {
                    id
                },
                data: {
                    NameService,
                    img,
                    price,
                    description,
                }
            })

            return response.status(201).send("Sucess")
        } catch (error) {
            console.log(error)
            throw error
        }
        
    })
}