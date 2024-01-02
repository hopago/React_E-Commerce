import { gql } from "graphql-request";

export const EXECUTE_PAYMENT = gql`
  type PayInfo {
    id: string;
    amount: Int;
  }
  type PaymentInfo {
    payInfo: PayInfo[]
  }

  mutation EXECUTE_PAYMENT($info: PaymentInfo) {
    payInfo(info: $info)
  }
`