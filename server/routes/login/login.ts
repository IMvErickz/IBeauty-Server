import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { authenticate } from "../../plugins/authenticate";

export async function Login(fastify: FastifyInstance) {
    fastify.get('/auth', {
        onRequest: [authenticate]
    }, async (request) => {
        return { user: request.user }
    })

    fastify.post('/users', async (request) => {

        const createUserBody = z.object({
            access_token: z.string(),
        })

        const { access_token } = createUserBody.parse(request.body)

        const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        const userData = await userResponse.json()

        const userInfoSchema = z.object({
            id: z.string(),
            email: z.string().email(),
            name: z.string(),
            picture: z.string().url(),

        })

        const userInfo = userInfoSchema.parse(userData)

        let user = await prisma.client.findUnique({
            where: {
                email: userInfo.email
            }
        })

        if (!user) {
            user = await prisma.client.create({
                data: {
                    id: userInfo.id,
                    Name: userInfo.name,
                    email: userInfo.email,
                    img: userInfo.picture,

                }
            })
        }

        const token = fastify.jwt.sign({
            nome: user.Name,
            avatarUrl: user.img,

        }, {
            sub: user.id,
            expiresIn: '30 days'
        })

        return { token }
    })


    fastify.post('/login/:auth', async (request, reply) => {
        const loginSchema = z.object({
            email: z.string().email(),
            password: z.string()
        })

        const authParam = z.object({
            auth: z.string()
        })

        const { email, password } = loginSchema.parse(request.body)
        const { auth } = authParam.parse(request.params)

        if (auth == 'Cliente') {
            const user = await prisma.client.findUniqueOrThrow({
                where: {
                    email
                },
            })

            if (user.Password != password) {
                return reply.status(401).send()
            }
            return { user }

        } else if (auth == 'Profissional') {
            const user = await prisma.provider.findUniqueOrThrow({
                where: {
                    email
                }
            })
            if (user.Password != password) {
                return reply.status(401).send()
            }

            return { user }
        }





    })
}
