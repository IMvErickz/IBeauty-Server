import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function CreateSchedule(fastify: FastifyInstance) {
    fastify.post('/shedule/:id', async (request, reply) => {
        const providerId = z.object({
            id: z.string()
        })

        const timerIntervalSchema = z.object({
            time_end_in_minutes: z.number(),
            time_start_in_minutes: z.number(),
            week_day: z.number(),
        })

        const { id } = providerId.parse(request.params)

        const { time_end_in_minutes, time_start_in_minutes, week_day } = timerIntervalSchema.parse(request.body)
        
        await prisma.timeInterval.create({
            data: {
                time_end_in_minutes,
                time_start_in_minutes,
                week_day,
                Provider: {
                    connect: {
                        id
                    }
                }
            }
        })

        return reply.status(201).send('success')
    })
}