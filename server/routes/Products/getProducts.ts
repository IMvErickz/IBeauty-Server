import { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";

export async function GetProducts(fastify: FastifyInstance) {
    fastify.get('/products', async () => {
        const getAllProducts = await prisma.products.findMany()

        return {getAllProducts}
    })
}