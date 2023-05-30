const fastify = require('fastify')({
  logger: true
})

fastify.get('/', async (request: unknown, reply: unknown) => {
  return { hello: 'world' }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()