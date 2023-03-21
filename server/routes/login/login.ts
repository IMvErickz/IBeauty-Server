import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function Login(fastify: FastifyInstance) {
    fastify.get('/provider/:email', async (request) => {
        const user = z.object({
            email: z.string(),
            //Senha: z.string()
        })

        const { email } = user.parse(request.params)
        
        const userInfo = await prisma.prestador.findMany({
            where: {
                email
            },
            select: {
                email: true,
                Senha: true,
                CNPJ: true,
                Nome: true,
                img: true,
                servico: true,
                telefone: true,
                Endereco: {
                    select: {
                        cep: true,
                        numero: true
                    }
                }
            }
        })

        return {userInfo}
        
    })

    fastify.get('/client/:email', async (request) => {
        const user = z.object({
            email: z.string(),
            //Senha: z.string()
        })

        const { email } = user.parse(request.params)
        
        const userInfo = await prisma.cliente.findMany({
            where: {
                email
            },
            select: {
                email: true,
                senha: true,
                CPF: true,
                Nome: true,
                agendado: {
                    select: {
                        agenda: {
                            select: {
                                dia: true, 
                                horario: true,
                                id: true
                            }
                        },
                    }
                }
            }
        })

        return {userInfo}
        
    })
}