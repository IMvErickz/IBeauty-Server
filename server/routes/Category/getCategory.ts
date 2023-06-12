import { prisma } from '../../lib/prisma'
import {FastifyInstance} from 'fastify'

export async function GetCategory(fastify: FastifyInstance) {
    
    fastify.get('/categorys', async () => {
        
       const getCategory =  await prisma.category.findMany()

        return {getCategory}
        
    })

}