import { prisma } from "../../lib/prisma";
import {FastifyInstance} from 'fastify'
import { z } from "zod";

export async function RegistrerUserRoute(fastify: FastifyInstance){
    fastify.post('/user/register', async (request, reply) => {
        const createUser = z.object({
            CPF: z.string(),
            Nome: z.string(),
            email: z.string().email(),
            Senha: z.string(),
            telefone: z.string(),
            cep: z.string(),
            numero: z.string(),
            dateBirth: z.string()

        })

        const { CPF, Nome, email, Senha, cep, numero, telefone, dateBirth } = createUser.parse(request.body)
        
        try {
            await prisma.cliente.create({
                data: {
                    email,
                    Nome,
                    Senha,
                    telefone,
                    CPF,
                    dateBirth,
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