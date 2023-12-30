import { Product } from "../../../graphql/products/products";

export default function ProductDetail({
  product: { title, description, imageUrl, price },
}: {
  product: Product;
}) {
  return (
    <div className="product-detail">
      <span className="product-detail__title">{title}</span>
      <p className="product-description">{description}</p>
      <img className="product-detail__image" src={imageUrl} />
      <span className="product-detail__price">${price}</span>
    </div>
  );
}
