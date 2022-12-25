import Fastify from "fastify";
import Cors from '@fastify/cors'
import { RegistrerUserRoute } from "./routes/registerUser";
import { ResgiterProvider } from "./routes/registerProvider";
import { RegisterCategory } from "./routes/registerCategory";
import { RegisterService } from "./routes/registerService";
import { RegisterProducts } from "./routes/registerProducts";
import { RegisterSchedule } from "./routes/registerSchedule";


async function start() {
const fastify = Fastify({
        logger: true,
        
    })

    await fastify.register(Cors, {
        origin: true,
    })

    await fastify.register(RegistrerUserRoute)
    await fastify.register(ResgiterProvider)
    await fastify.register(RegisterCategory)
    await fastify.register(RegisterService)
    await fastify.register(RegisterProducts)
    await fastify.register(RegisterSchedule)

    await fastify.listen({port: 4242, host: '0.0.0.0'})
    
}

start()