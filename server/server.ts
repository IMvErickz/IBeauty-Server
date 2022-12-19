import Fastify from "fastify";
import Cors from '@fastify/cors'
import { RegistrerUserRoute } from "./routes/registerUser";
import { ResgiterProvider } from "./routes/registerProvider";


async function start() {
const fastify = Fastify({
        logger: true,
        
    })

    await fastify.register(Cors, {
        origin: true,
    })

    await fastify.register(RegistrerUserRoute)
    await fastify.register(ResgiterProvider)

    await fastify.listen({port: 4242})
    
}

start()