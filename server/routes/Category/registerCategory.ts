import { prisma } from '../../lib/prisma'
import {FastifyInstance} from 'fastify'
import { z } from 'zod'

export async function RegisterCategory(fastify: FastifyInstance) {

    
    fastify.get('/categorys', async () => {
        
       const getCategory =  await prisma.categoria.findMany()

        return {getCategory}
        
    })

}