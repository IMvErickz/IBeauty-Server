import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function GetServiceName(fastify: FastifyInstance) {
    fastify.get('/service/name', async (request, reply) => {
        const serviceName = z.object({
            NomeServico: z.string()
        })

        const {NomeServico} = serviceName.parse(request.body)
        
        try {
            await prisma.servico.findMany({
                where: {
                    NomeServico
                }
            })
        } catch (error) {
            throw error
        }

        return reply.status(201).send()
    })
}