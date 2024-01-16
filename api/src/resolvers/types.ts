type Method = "Query" | "Mutation" | string;

import { TProduct } from "../types/product";
import { TCart } from "../types/cart";

export type Resolver = {
  [k in Method]: {
    [key: string]: (
      parent: any,
      args: { [key: string]: any },
      context: {
        db: {
          products: TProduct[],
          cart: TCart[]
        }
      },
      info: any
    ) => any;
  };
};
