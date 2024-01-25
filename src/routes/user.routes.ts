import { FastifyInstance } from "fastify";
import { z } from "zod";
import Messages from "../module/messages";
import UserController from "../controllers/userController";

const userController = new UserController()
const messages = new Messages()

export async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/user', async(request, reply) => {
        try {
            const bodyParams = z.object({
                name: z.string(),
                email: z.string(),
                password: z.string()
            })

            const rawBody = request.body

            if(JSON.stringify(rawBody) === '{}')
                reply
                    .status(400)
                    .send({ response: messages.MESSAGE_ERROR.EMPTY_BODY })

            const body = bodyParams.parse(rawBody)

            const createUser = await userController.createUser(body)

            reply
                .status(createUser.statusCode)
                .send({ response: createUser.message })
        } catch (error) {
            if (error instanceof Error)
				reply.status(400).send({response: JSON.parse(error.message)});
			reply.status(400).send({response: 'Unknown error'});
        }
    })

    fastify.get('/users', async(request, reply) => {
        try {
            const allUsers = await userController.getAllUsers()

            reply
                .status(allUsers.statusCode)
                .send({ response: allUsers.message} )
        } catch (error) {
            if (error instanceof Error)
				reply.status(400).send({response: JSON.parse(error.message)});
			reply.status(400).send({response: 'Unknown error'});
        }
    })

    fastify.get('/user/:userId', async(request, reply) => {
        try {
            const queryParams = z.object({
                userId: z.string()
            })

            const { userId } = queryParams.parse(request.params)

            if(!userId) reply.status(400).send({ response: messages.MESSAGE_ERROR.REQUIRED_ID })

            const userById = await userController.getUserById(parseInt(userId))

            reply
                .status(userById.statusCode)
                .send({ response: userById.message })
        } catch (error) {
            if (error instanceof Error)
				reply.status(400).send({response: JSON.parse(error.message)});
			reply.status(400).send({response: 'Unknown error'});
        }
    })
}