import { useQuery } from "react-query"
import { QueryKeys, graphqlFetcher } from "../../lib/react-query/queryClient"
import { GET_CART } from "../../graphql/cart/cart"
import CartList from "./_components/CartList";
import { Product } from "../../graphql/products/products";

export type CartQueryResult = {
  cart: CartItems
}

export type CartItems = {
  id: string;
  amount: number;
  product?: Product
}[]

export type CartItem = {
  id: string;
  amount: number;
  product?: Product;
}

export default function CartIndex() {
  const { data } = useQuery<CartQueryResult>(
    QueryKeys.CART,
    () => graphqlFetcher(GET_CART),
    {
      staleTime: 600 * 1000,
      cacheTime: 600 * 1000,
    }
  );
 
  if (!data) {
    return (
      <div>
        장바구니가 비었어요
      </div>
    )
  }

  return (
    <CartList items={data.cart} />
  )
}
