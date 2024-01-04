import { gql } from "apollo-server-express";

const cartSchema = gql`
  type CartItem {
    id: String!
    imageUrl: String!
    price: Int!
    title: String!
    amount: Int!
  }

  extend type Query {
    cart: [CartItem!]
  }

  extend type Mutation {
    addCart(id: ID!): CartItem!
    updateCart(id: ID!, amount: Int!): CartItem!
    deleteCart(id: ID!): ID!
    executePayment(ids: [ID!]): [ID!]
  }
`;

export default cartSchema;