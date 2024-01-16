import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema/index.js";
import resolvers from "./resolvers/index.js"
import { DBField, readDB } from "./dbController.js";

(async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
      db: {
        products: readDB(DBField.PRODUCTS),
        cart: readDB(DBField.CART)
      }
    }
  });
  const app = express();

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    },
  });

  app.listen({ port: 8181 });
  console.log("Server listening on port 8181...");
})();
