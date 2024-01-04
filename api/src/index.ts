import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";

(async () => {
  const server = new ApolloServer({
    typeDefs: schema
  });
  const app = express();

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true,
    },
  });

  app.listen({ port: 8000 });
  console.log("Server listening on port 8000...");
})();
