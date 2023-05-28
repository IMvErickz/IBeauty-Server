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
        
        const userInfo = await prisma.provider.findMany({
            where: {
                email
            },
            select: {
                email: true,
                Password: true,
                CNPJ: true,
                Name: true,
                img: true,
                Service: {
                    select: {
                        id: true,
                        NameService: true,
                        price: true,
                        img: true,
                    }
                },
                cellNumber: true,
                Address: {
                    select: {
                        cep: true,
                        number: true
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
        
        const userInfo = await prisma.client.findMany({
            where: {
                email
            },
            select: {
                email: true,
                Password: true,
                CPF: true,
                Name: true,
                cheduled: {
                    select: {
                        schedule: {
                            select: {
                                day: true, 
                                hour: true,
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