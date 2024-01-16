import { Resolver } from "./types.js";

const productResolvers: Resolver = {
  Query: {
    products: (_1, _2, { db }) => {
      return db.products;
    },
    product: (_: any, { id }, { db }) => {
      const found = db.products.find((product) => product.id === id);
      if (!found) return null;
      return found;
    },
  },
  Mutation: {},
};

export default productResolvers;