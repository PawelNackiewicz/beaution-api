import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers, typeDefs } from './setup'

declare const PhusionPassenger: unknown;

const fastify = require("fastify")({
  logger: true,
});

fastify.get("/", async (request: unknown, reply: unknown) => {
  return { hello: "world" };
});

if (typeof (PhusionPassenger) !== 'undefined') {
  //@ts-ignore
  PhusionPassenger.configure({ autoInstall: false });
}

const startFastifyApp = async () => {
  try {
    if (typeof PhusionPassenger !== "undefined") {
      fastify.listen({ path: "passenger", host: "127.0.0.1" });
    } else {
      fastify.listen(3000);
    }
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    await startFastifyApp();
    console.log(`🚀 Server ready at ${url}`);
  } catch (e) {
    console.error(e)
  }
}

startApolloServer()