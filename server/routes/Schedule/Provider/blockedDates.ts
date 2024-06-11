import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";

export async function BlockedDates(fastify: FastifyInstance) {
  fastify.get('/blocked-date/:id', async (request) => {
      
      const blockedDateSchema = z.object({
        id: z.string()
      })
  
      const blockedDateQueryParams = z.object({
        year: z.string().optional(),
        month: z.string().optional()
      })

        const { id } = blockedDateSchema.parse(request.params)
        const { year, month } = blockedDateQueryParams.parse(request.query)

        const availableWeekDays = await prisma.timeInterval.findMany({
            select: {
              week_day: true,
            },
            where: {
                Provider: {
                  id,
              }
            },
          })

        const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
            return !availableWeekDays.some(
              (availableWeekDay) => availableWeekDay.week_day === weekDay,
            )
        })
    
        const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
      SELECT
        EXTRACT(DAY FROM S.date) AS date,
        COUNT(S.date) AS amount,
        ((COALESCE(UTI.time_end_in_minutes, 0) - COALESCE(UTI.time_start_in_minutes, 0)) / 60) AS size
      FROM "Scheduling" S
      LEFT JOIN "TimeInterval" UTI
        ON UTI.week_day = EXTRACT(DOW FROM S.date)
      WHERE S."providerId" = ${id}
        AND TO_CHAR(S.date, 'YYYY-MM') = ${`${year}-${month}`}
      GROUP BY
        EXTRACT(DAY FROM S.date),
        ((COALESCE(UTI.time_end_in_minutes, 0) - COALESCE(UTI.time_start_in_minutes, 0)) / 60)
      HAVING COUNT(S.date) >= ((COALESCE(UTI.time_end_in_minutes, 0) - COALESCE(UTI.time_start_in_minutes, 0)) / 60);
    `;
        
        const blockedDates = blockedDatesRaw.map((item) => item.date)

        return {blockedDates, blockedWeekDays}
    })
}