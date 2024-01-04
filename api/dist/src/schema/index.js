import { gql } from "apollo-server-express";
import productSchema from "./product.js";
import cartSchema from "./cart.js";
const linkSchema = gql `
    type Query {
      _: Boolean
    }
    type Mutation {
      _: Boolean
    }
`;
export default [linkSchema, productSchema, cartSchema];
