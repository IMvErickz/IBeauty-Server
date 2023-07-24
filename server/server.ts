import Fastify from "fastify";
import Cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import { resolve } from 'node:path'
import { RegistrerUserRoute } from "./routes/Users/registerUser";
import { ResgiterProvider } from "./routes/Provider/registerProvider";
import { GetCategory } from "./routes/Category/getCategory";
import { RegisterService } from "./routes/Services/registerService";
import { RegisterProducts } from "./routes/Products/registerProducts";
import { RegisterHour } from "./routes/Schedule/Provider/registerHour";
import { GetProductId } from "./routes/Products/getProdutsName";
import { GetProducts } from "./routes/Products/getProducts";
import { GetService } from "./routes/Services/getServices";
import { GetServiceId } from "./routes/Services/getServiceId";
import { GetUser } from "./routes/Users/getUser";
import { GetSchedule } from "./routes/Schedule/Client/clientScheduling";
import { Create } from "./routes/Schedule/Client/createClientScheduled";
import { RegisterStatus } from "./routes/Schedule/Status/registerStatus";
import { RegisterDay } from "./routes/Schedule/Provider/registerDay";
import { GetStatus } from "./routes/Schedule/Status/getStatus";
import { GetProvider } from "./routes/Provider/getProvider";
import { GetProviderService } from "./routes/Services/getServiceProvider";
import { Login } from "./routes/login/login";
import { GetAllUSers } from "./routes/Users/getAllUsers";
import { UpdateService } from "./routes/Services/updateServices";
import { UpdateProducts } from "./routes/Products/updateProducts";
import { GetId } from "./routes/Schedule/Provider/getDay";
import { GetHours } from "./routes/Schedule/Provider/getHours";
import { RegisterCategory } from "./routes/Category/registerCategory";
import { GetPastService } from "./routes/Users/getPastService";
import { SetPastService } from "./routes/Users/setPastService";
import { Upload } from "./routes/upload/upload";
import { request } from "node:http";
import { Payment } from "./routes/Payments/createPayment";
import { PastService } from "./routes/Services/pastService";


async function start() {

    const fastify = Fastify({
        logger: true,

    })

    await fastify.register(Cors, {
        origin: true,
    })

    await fastify.register(multipart)

    await fastify.register(require('@fastify/static'), {
        root: resolve(__dirname, '../uploads'),
        prefix: '/uploads'
    })

    await fastify.register(RegistrerUserRoute)
    await fastify.register(ResgiterProvider)
    await fastify.register(GetCategory)
    await fastify.register(RegisterCategory)
    await fastify.register(RegisterService)
    await fastify.register(RegisterProducts)
    await fastify.register(RegisterHour)
    await fastify.register(GetProductId)
    await fastify.register(GetProducts)
    await fastify.register(GetService)
    await fastify.register(GetServiceId)
    await fastify.register(GetUser)
    await fastify.register(GetSchedule)
    await fastify.register(Create)
    await fastify.register(RegisterStatus)
    await fastify.register(RegisterDay)
    await fastify.register(GetStatus)
    await fastify.register(GetProvider)
    await fastify.register(GetProviderService)
    await fastify.register(Login)
    await fastify.register(GetAllUSers)
    await fastify.register(UpdateService)
    await fastify.register(UpdateProducts)
    await fastify.register(GetId)
    await fastify.register(GetHours)
    await fastify.register(GetPastService)
    await fastify.register(SetPastService)
    await fastify.register(Upload)
    await fastify.register(Payment)
    await fastify.register(PastService)


    await fastify.listen({ port: 3333, host: '0.0.0.0' })

}

start()