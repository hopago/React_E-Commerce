import { useQuery } from "react-query"
import { QueryKeys, graphqlFetcher } from "../../lib/react-query/queryClient"
import { Cart, GET_CART } from "../../graphql/cart/cart"
import CartList from "./_components/CartList";

export default function CartIndex() {
  const { data } = useQuery(QueryKeys.CART, () => graphqlFetcher(GET_CART));

  if (!data) {
    return (
      <div>
        장바구니가 비었어요
      </div>
    )
  }

  const cartItems = Object.values(data);

  return (
    <CartList items={cartItems} />
  )
}
