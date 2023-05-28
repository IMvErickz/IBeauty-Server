import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";

export async function GetId(fastify: FastifyInstance) {
    fastify.get('/schedule/:id', async (request) => {

        const serviceSchema = z.object({
            id: z.string()
        })

        const {id} = serviceSchema.parse(request.params)

        const day = await prisma.service.findMany({
            where: {
                id
            },
            select: {
                ScheduleDay: {
                    select: {
                        id: true,
                        day: true
                   }
               }
            }
        })

        return {day}
    })
}