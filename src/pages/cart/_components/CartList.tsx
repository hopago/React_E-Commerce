import { Cart } from "../../../graphql/cart/cart";
import CartItem from "./CartItem";

export default function CartList({ items }: { items: Cart[] }) {
  return (
    <ul>
      {items.map((item) => (
        <CartItem {...item} key={item.id} />
      ))}
    </ul>
  );
}
