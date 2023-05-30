declare const PhusionPassenger: unknown;

const fastify = require("fastify")({
  logger: true,
});

fastify.get("/", async (request: unknown, reply: unknown) => {
  return { hello: "world" };
});

const start = async () => {
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
start();