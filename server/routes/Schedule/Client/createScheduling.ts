import { FastifyInstance } from "fastify";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";
import dayjs from "dayjs";

export async function CreateScheduling(fastify: FastifyInstance) {
    fastify.post('/scheduling/create', async (request, reply) => {
        const schedulingParams = z.object({
            clientId: z.string(),
            providerId: z.string(),
            serviceId: z.string()
        })

        const schedulingBody = z.object({
            name: z.string(),
            email: z.string(),
            date: z.string().datetime(),
            observations: z.string().optional()
        })

        const { clientId, providerId, serviceId } = schedulingParams.parse(request.query)
        const { date, email, name, observations } = schedulingBody.parse(request.body)

        const schedulingDate = dayjs(date).startOf('hour')

        if (schedulingDate.isBefore(new Date())) {
            return reply.status(400).send({
            message: 'Date is in the past.',
            })
        }

        const provider = await prisma.provider.findUnique({
            where: {
                id: providerId
            }
        })

        if (!provider) {
            return reply.status(400).send({message: 'Prestador não encontrado'})
        }

        await prisma.scheduling.create({
            data: {
                name,
                email,
                date,
                observations,
                clientId,
                providerId: provider.id,
                serviceId
            }
        })

        return reply.status(201).send('created')
    })
}