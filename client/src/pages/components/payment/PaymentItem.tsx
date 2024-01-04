import { Cart } from "../../../graphql/cart/cart";

export default function PaymentItem({
  imageUrl,
  id,
  price,
  title,
}: Pick<Cart, "imageUrl" | "id" | "price" | "title">) {
  return (
    <>
      <img src={imageUrl} alt={`cart${id}`} />
      <p className="cart-item__price">{price}</p>
      <p className="cart-item__title">{title}</p>
    </>
  );
}
