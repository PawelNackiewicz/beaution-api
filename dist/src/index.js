"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const setup_1 = require("./setup");
const fastify = require("fastify")({
    logger: true,
});
fastify.get("/", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { hello: "world" };
}));
const startFastifyApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof PhusionPassenger !== "undefined") {
            fastify.listen({ path: "passenger", host: "127.0.0.1" });
        }
        else {
            fastify.listen(3000);
        }
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const server = new server_1.ApolloServer({
            typeDefs: setup_1.typeDefs,
            resolvers: setup_1.resolvers,
        });
        try {
            const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
                listen: { port: 4000 },
            });
            yield startFastifyApp();
            console.log(`🚀 Server ready at ${url}`);
        }
        catch (e) {
            console.error(e);
        }
    });
}
startApolloServer();
