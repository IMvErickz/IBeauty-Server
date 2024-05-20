import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export async function CreateSchedule(fastify: FastifyInstance) {
    fastify.post('/shedule/:id', async (request, reply) => {
        const providerId = z.object({
            id: z.string()
        })

        const timerIntervalSchema = z.object({
            intervals: z.array(z.object({
                endTimeInMinutes: z.number(),
                startTimeInMinutes: z.number(),
                weekDay: z.number(),
            }))
        })

        const { id } = providerId.parse(request.params)

        const { intervals } = timerIntervalSchema.parse(request.body)

        await Promise.all(
            intervals.map((interval) => {
              return prisma.timeInterval.create({
                data: {
                    time_end_in_minutes: interval.endTimeInMinutes,
                    time_start_in_minutes: interval.startTimeInMinutes,
                    week_day: interval.weekDay,
                    Provider: {
                        connect: {
                            id
                        }
                    }
                }
              })
            }),
          )

        return reply.status(201).send('success')
    })
}