import { Product } from "../../../graphql/products/products";

export default function PaymentItem({
  imageUrl,
  id,
  price,
  title,
}: Product) {
  return (
    <>
      <img src={imageUrl} alt={`cart${id}`} />
      <p className="cart-item__price">{price}</p>
      <p className="cart-item__title">{title}</p>
    </>
  );
}
