
export default function ProductDetail({
  product: { category, title, description, image, price },
}: {
  product: Product;
}) {
  return (
    <div className="product-detail">
      <p className="product-detail__category">{category}</p>
      <span className="product-detail__title">{title}</span>
      <p className="product-description">{description}</p>
      <img className="product-detail__image" src={image} />
      <span className="product-detail__price">${price}</span>
    </div>
  );
}
