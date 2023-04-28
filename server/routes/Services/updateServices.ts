import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

export async function UpdateService(fastify: FastifyInstance) {
    fastify.put('/updateService/:id', async (request, response) => {

        const data = z.object({
            NomeServico: z.string(),
            img: z.string(),
            preco: z.string(),
            descricao: z.string()
        })

        const { NomeServico, descricao, img, preco } = data.parse(request.body)
        
        const idService = z.object({
            id: z.string()
        })

        const {id} = idService.parse(request.params)

        try {
            const service = await prisma.servico.update({
                where: {
                    id
                },
                data: {
                    NomeServico,
                    img,
                    preco,
                    descricao,
                }
            })

            return response.status(201).send("Sucess")
        } catch (error) {
            console.log(error)
            throw error
        }
        
    })
}