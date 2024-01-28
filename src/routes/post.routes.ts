import { FastifyInstance } from "fastify";
import { z } from "zod";
import Messages from "../module/messages";
import PostController from "../controllers/postController";

const messages = new Messages()
const postController = new PostController()

export async function postRoutes(fastify: FastifyInstance) {
    fastify.post('/post', async(request, reply) => {
        try {
            const bodyParams = z.object({
                title: z.string(),
                content: z.string(),
                userId: z.number()
            })

            const rawBody = request.body

            if(JSON.stringify(rawBody) === '{}')
                reply
                    .status(400)
                    .send({ response: messages.MESSAGE_ERROR.EMPTY_BODY })

            const body = bodyParams.parse(rawBody)

            const createdPost = await postController.createPost(body)

            reply
                .status(createdPost.statusCode)
                .send({ response: createdPost.message })

        } catch (error) {
            if (error instanceof Error)
				reply.status(400).send({response: JSON.parse(error.message)});
			reply.status(400).send({response: 'Unknown error'});
        }
    })
}