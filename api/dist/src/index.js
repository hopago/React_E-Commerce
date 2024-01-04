var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema/index.js";
import resolvers from "./resolvers/index.js";
(() => __awaiter(void 0, void 0, void 0, function* () {
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers
    });
    const app = express();
    yield server.start();
    server.applyMiddleware({
        app,
        path: "/graphql",
        cors: {
            origin: ["http://localhost:3000"],
            credentials: true,
        },
    });
    app.listen({ port: 8181 });
    console.log("Server listening on port 8000...");
}))();
