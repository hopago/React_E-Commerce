import { gql } from "graphql-tag";

export const EXECUTE_PAYMENT = gql`
  mutation EXECUTE_PAYMENT($info: [String!]) {
    executePayment(info: $info)
  }
`