import { Cart } from "../../../graphql/cart/cart";
import CartItem from "./CartItem";
import '../../scss/cart.scss';

export default function CartList({ items }: { items: Cart[] }) {
  return (
    <>
    <label>
      <input type="checkbox" />
      전체선택
    </label>
    <ul className="cart">
      {items.map((item) => (
        <CartItem {...item} key={item.id} />
      ))}
    </ul>
    </>
  );
}
