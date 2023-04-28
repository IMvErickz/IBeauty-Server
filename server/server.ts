import Fastify from "fastify";
import Cors from '@fastify/cors'
import { RegistrerUserRoute } from "./routes/Users/registerUser";
import { ResgiterProvider } from "./routes/Provider/registerProvider";
import { RegisterCategory } from "./routes/Category/registerCategory";
import { RegisterService } from "./routes/Services/registerService";
import { RegisterProducts } from "./routes/Products/registerProducts";
import { RegisterSchedule } from "./routes/Schedule/registerSchedule";
import { GetProductId } from "./routes/Products/getProdutsName";
import { GetProducts } from "./routes/Products/getProducts";
import { GetService } from "./routes/Services/getServices";
import { GetServiceId } from "./routes/Services/getServiceId";
import { GetUser } from "./routes/Users/getUser";
import { GetSchedule } from "./routes/Schedule/getSchedule";
import { GetScheduleId } from "./routes/Schedule/getScheduleId";
import { RegisterStatus } from "./routes/Schedule/Status/registerStatus";
import { RegisterDay } from "./routes/Schedule/registerDay";
import { GetStatus } from "./routes/Schedule/Status/getStatus";
import { GetProvider } from "./routes/Provider/getProvider";
import { GetProviderService } from "./routes/Services/getServiceProvider";
import { Login } from "./routes/login/login";
import { GetAllUSers } from "./routes/Users/getAllUsers";
import { UpdateService } from "./routes/Services/updateServices";
import { UpdateProducts } from "./routes/Products/updateProducts";


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
    await fastify.register(GetProductId)
    await fastify.register(GetProducts)
    await fastify.register(GetService)
    await fastify.register(GetServiceId)
    await fastify.register(GetUser)
    await fastify.register(GetSchedule)
    await fastify.register(GetScheduleId)
    await fastify.register(RegisterStatus)
    await fastify.register(RegisterDay)
    await fastify.register(GetStatus)
    await fastify.register(GetProvider)
    await fastify.register(GetProviderService)
    await fastify.register(Login)
    await fastify.register(GetAllUSers)
    await fastify.register(UpdateService)
    await fastify.register(UpdateProducts)

    await fastify.listen({port: 3333, host: '0.0.0.0'})
    
}

start()