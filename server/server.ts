import Fastify from "fastify";
import Cors from '@fastify/cors'
import { RegistrerUserRoute } from "./routes/Users/registerUser";
import { ResgiterProvider } from "./routes/Provider/registerProvider";
import { RegisterCategory } from "./routes/Category/registerCategory";
import { RegisterService } from "./routes/Services/registerService";
import { RegisterProducts } from "./routes/Products/registerProducts";
import { RegisterSchedule } from "./routes/Schedule/registerSchedule";


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