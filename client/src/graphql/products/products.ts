import { gql } from "graphql-tag";

export type Product = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  createdAt: string;
};

const GET_PRODUCTS = gql`
  query GET_PRODUCTS {
    products {
      id
      imageUrl
      price
      title
      description
    }
  }
`;

export const GET_PRODUCT = gql`
  query GET_PRODUCT ($productId: ID!) {
    product(id: $productId) {
      id
      imageUrl
      price
      title
      description
    }
  }
`;

export default GET_PRODUCTS;
