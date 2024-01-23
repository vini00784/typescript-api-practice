import Fastify from 'fastify';
import cors from '@fastify/cors'

const fastify = Fastify({
    logger: false
})

fastify.register(cors, {
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE']
})

const port: number = Number(process.env.port) || 8080
fastify.listen({ port }, () => console.log("Server listening at https://localhost:8080"))