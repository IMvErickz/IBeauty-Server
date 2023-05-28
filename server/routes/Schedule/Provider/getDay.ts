import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";

export async function GetId(fastify: FastifyInstance) {
    fastify.get('/schedule/:id', async (request) => {

        const serviceSchema = z.object({
            id: z.string()
        })

        const {id} = serviceSchema.parse(request.params)

        const day = await prisma.servico.findMany({
            where: {
                id
            },
            select: {
                agendaDia: {
                    select: {
                        id: true,
                        dia: true
                   }
               }
            }
        })

        return {day}
    })
}