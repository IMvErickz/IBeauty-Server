import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function GetProviderService(fastify: FastifyInstance) {
    fastify.get('/services/:CNPJ', async (request) => {

        const provider = z.object({
            CNPJ: z.string()
        })

        const {CNPJ} = provider.parse(request.params)

     const services = await prisma.prestador.findMany({
            where: {
                CNPJ
         },
         
         select: {
             Nome: true,
             img: true,
             servico: {
                 select: {
                     NomeServico: true,
                     categoria: true,
                     preco: true,
                     descricao: true,
                     img: true,
                     id: true
                    }
                }
            }
        })
    return {services}

    })

}