import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";

export async function GetId(fastify: FastifyInstance) {
    fastify.get('/schedule/:servicoId', async (request, response) => {

        const serviceSchema = z.object({
            servicoId: z.string()
        })

        const {servicoId} = serviceSchema.parse(request.params)

        const day = await prisma.agendaDia.findMany({
            where: {
                servicoId
            },
            select: {
                id: true,
                dia: true
            }
        })

        response.status(201).send({day})
    })
}