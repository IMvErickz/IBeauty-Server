import { z } from 'zod'
import { prisma } from "../../lib/prisma";
import {FastifyInstance} from 'fastify'

export async function ResgiterProvider(fastify: FastifyInstance) {
    fastify.post('/provider/register', async (request, reply) => {
        const registerProvider = z.object({
            CNPJ: z.string(),
            Nome: z.string(),
            email: z.string().email(),
            Senha: z.string(),
            img: z.string(),
            telefone: z.string(),
            cep: z.string(),
            numero: z.string()
        })

        const { CNPJ, Nome, email, Senha, img, telefone, cep, numero } = registerProvider.parse(request.body)
        
        try {
            await prisma.prestador.create({
                data: {
                    CNPJ,
                    Nome,
                    email,
                    Senha,
                    img,
                    telefone,
                    Endereco: {
                        create: {
                            cep,
                            numero
                        }
                    }
                }
            })
        } catch (error) {
            console.log(error)
            throw error
        }

        return reply.status(201).send()
    })
}