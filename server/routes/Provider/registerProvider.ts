import { z } from 'zod'
import { prisma } from "../../lib/prisma";
import {FastifyInstance} from 'fastify'

export async function ResgiterProvider(fastify: FastifyInstance) {
    fastify.post('/provider/register', async (request, reply) => {
        const registerProvider = z.object({
            CNPJ: z.string(),
            Nome: z.string(),
            email: z.string(),
            Senha: z.string(),
        })

        const { CNPJ, Nome, email, Senha } = registerProvider.parse(request.body)
        
        try {
            await prisma.prestador.create({
                data: {
                    CNPJ,
                    Nome,
                    email,
                    Senha,
                }
            })
        } catch (error) {
            console.log(error)
            throw error
        }

        return reply.status(201).send()
    })
}