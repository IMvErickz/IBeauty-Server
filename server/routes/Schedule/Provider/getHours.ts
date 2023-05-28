import { FastifyInstance } from "fastify"
import { prisma } from "../../../lib/prisma"
import { z } from "zod"

export async function GetHours(fastify: FastifyInstance) {
    fastify.get('/days/:id', async (request, response) => {

        const hoursSchema = z.object({
            id: z.string()
        })

        const { id } = hoursSchema.parse(request.params)

        const days = await prisma.scheduleHour.findMany({
            where: {
                ScheduleDay: {
                    some: {
                        id
                    }
                }
            },
            select: {
                id: true,
                hour: true
            }
        })

        return {days}
    })
}