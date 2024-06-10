import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import dayjs from "dayjs";

export async function Availability(fastify: FastifyInstance) {
    fastify.post('/availability/:id', async (request, reply) => {
        const providerId = z.object({
            id: z.string()
        })

        const availabilityDate = z.object({
            date: z.string()
        })

        const { id } = providerId.parse(request.params)
        const { date } = availabilityDate.parse(request.body)

        if (!date) {
            return reply.status(400).send({ message: 'Date no provided.' })
          }
        
          const user = await prisma.provider.findUnique({
            where: {
              id,
            },
          })
        
          if (!user) {
            return reply.status(400).send({ message: 'User does not exist.' })
        }
        
        const referenceDate = dayjs(date)
        const isPastDate = referenceDate.endOf('day').isBefore(new Date())
        
        if (isPastDate) {
            return reply.send({ possibleTimes: [], availableTimes: [] })
        }
        
        const providerAvailability = await prisma.timeInterval.findFirst({
            where: {
              providerId: id,
              week_day: referenceDate.get('day'),
            },
        })
        
        if (!providerAvailability) {
            return reply.send({ possibleTimes: [], availableTimes: [] })
        }
        
        const { time_start_in_minutes, time_end_in_minutes } = providerAvailability

        const startHour = time_start_in_minutes / 60
        const endHour = time_end_in_minutes / 60

        const possibleTimes = Array.from({ length: endHour - startHour }).map(
            (_, i) => {
              return startHour + i
            },
        )
        
        const blockedTimes = await prisma.scheduling.findMany({
            select: {
              date: true,
            },
            where: {
              providerId: user.id,
              date: {
                gte: referenceDate.set('hour', startHour).toDate(),
                lte: referenceDate.set('hour', endHour).toDate(),
              },
            },
        })
        
        const availableTimes = possibleTimes.filter((time) => {
            const isTimeBlocked = blockedTimes.some(
              (blockedTime) => blockedTime.date.getHours() === time,
            )
        
            const isTimeInPast = referenceDate.set('hour', time).isBefore(new Date())
        
            return !isTimeBlocked && !isTimeInPast
        })
        
        return reply.send({ possibleTimes, availableTimes })
    })
}