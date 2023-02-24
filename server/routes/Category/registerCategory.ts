import { prisma } from '../../lib/prisma'
import {FastifyInstance} from 'fastify'
import { z } from 'zod'

export async function RegisterCategory(fastify: FastifyInstance) {

    
    fastify.get('/getCategory', async (reply) => {
        
       const getCategory =  await prisma.categoria.findMany()

        return {getCategory}
        
    })

}