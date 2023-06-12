import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import { randomUUID } from "crypto";
import { z } from "zod";

export async function RegisterCategory(fastify: FastifyInstance) {
    fastify.post('/category/register', async (request, response) => {

        const categorySchema = z.object({
            description: z.string(),
            NameCategory: z.string()
        })

        const {NameCategory,description} = categorySchema.parse(request.body)

        try {
            await prisma.category.create({
                data: {
                    description,
                    NameCategory,
                    id: randomUUID(),
                }
            })

            response.status(201).send()
        } catch (err) {
            response.status(500).send(`Error: ${err}`)
            throw err
        }
    })
}