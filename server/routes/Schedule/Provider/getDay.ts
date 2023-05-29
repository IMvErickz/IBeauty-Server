import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";

export async function GetId(fastify: FastifyInstance) {
    fastify.get('/schedule/:CNPJ', async (request) => {

        const serviceSchema = z.object({
            CNPJ: z.string()
        })

        const {CNPJ} = serviceSchema.parse(request.params)

        const day = await prisma.provider.findMany({
            where: {
                CNPJ
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