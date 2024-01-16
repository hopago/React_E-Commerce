import { gql } from "graphql-request";
import { Product } from "../products/products";

export type Cart = {
  id: string;
  amount: number;
  product?: Product
};

export const ADD_CART = gql`
  mutation ADD_CART($id: ID!) {
    addCart(id: $id) {
      id
      amount
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UPDATE_CART($addCartId: ID!, $amount: Int!) {
    updateCart(id: $addCartId, amount: $amount) {
      id
      amount
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
    }
  }
`;

export const DELETE_CART = gql`
  mutation DELETE_CART($deleteCartId: ID!) {
    deleteCart(id: $deleteCartId) {
      id
    }
  }
`;

export const GET_CART = gql`
  query GET_CART {
    cart {
      id
      amount
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
    }
  }
`;
