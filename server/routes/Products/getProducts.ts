import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function GetProducts(fastify: FastifyInstance) {
    fastify.get('/getAllProducts', async () => {
        const getAllProducts = await prisma.produtos.findMany()

        return {getAllProducts}
    })
}