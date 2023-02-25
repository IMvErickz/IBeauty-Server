import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function GetServiceId(fastify: FastifyInstance) {
    fastify.get('/service/:id', async (request) => {
        const serviceName = z.object({
            id: z.string()
        })

        const {id} = serviceName.parse(request.params)
        
        try {
           const service = await prisma.servico.findMany({
                where: {
                    id
                },
                select: {
                    NomeServico: true,
                    preco: true,
                    descricao: true,
                    img: true,
                    categoria: {
                        select: {
                            nomeCategoria: true
                        }
                    },
                    Prestador: {
                        select: {
                            Nome: true,
                        }
                    }
                }
           })
            
            return {service}
        } catch (error) {
            throw error
        }
    })
}