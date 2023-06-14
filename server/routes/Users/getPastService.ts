import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function GetPastService(fastify: FastifyInstance) {
    fastify.get('/pastService/:CPF', async (req, res) => {

        const responseSchema = z.object({
            CPF: z.string()
        })

        const {CPF} = responseSchema.parse(req.params)

        try {
            const response = await prisma.service.findMany({
                where: {
                    PastService: {
                        some: {
                            Client: {
                                CPF
                            }
                        }
                    }
                },
                select: {
                    PastService: {
                        select: {
                            Service: {
                                select: {
                                    id: true,
                                    NameService: true,
                                    price: true
                                }
                            }
                        }
                    }
                }
            })
    
            res.status(201).send(response)
        } catch (err) {
            res.status(500).send('Erro')
            throw err
        }
    })
}