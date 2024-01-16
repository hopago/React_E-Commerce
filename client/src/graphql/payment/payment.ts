import { gql } from "graphql-tag";

export const EXECUTE_PAYMENT = gql`
  mutation EXECUTE_PAYMENT($ids: [String!]) {
    executePayment(ids: $ids)
  }
`