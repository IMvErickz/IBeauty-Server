import { prisma } from "../lib/prisma";
import {FastifyInstance} from 'fastify'
import { z } from "zod";

export async function RegistrerUserRoute(fastify: FastifyInstance){
    fastify.post('/userRegister', async (request, reply) => {
        const createUser = z.object({
            CPF: z.string(),
            Nome: z.string(),
            email: z.string(),
            senha: z.string(),
        })

        const { CPF, Nome, email, senha } = createUser.parse(request.body)
        
        try {
            await prisma.cliente.create({
                data: {
                    email,
                    Nome,
                    senha,
                    CPF
                }
            })
        } catch (error) {
            console.log(error)
            throw error
        }
        return reply.status(201).send()
    })

    fastify.get('/getUser', async (request, reply) => {
        const getUser = z.object({
            CPF: z.string(),
            email: z.string(),
        })

        const { CPF } = getUser.parse(request.body)
        const { email } = getUser.parse(request.params)
        
        try {
            await prisma.cliente.findUnique({
                where: {
                    CPF,
                    email,
                }
            })
        } catch (error) {
            throw error
        }

        return reply.status(201).send()
    })
     
}