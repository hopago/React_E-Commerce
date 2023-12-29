import { Link } from "react-router-dom";
import "../../scss/index.scss";

export default function ProductItem({
  category,
  description,
  id,
  image,
  price,
  rating,
  title,
}: Product) {
  return (
    <li className="product-item">
      <Link className="link" to={`/products/${id}`}>
        <p className="product-item__category">{category}</p>
        <span className="product-item__title">{title}</span>
        <p className="product-description">{description}</p>
        <img className="product-item__image" src={image} />
        <span className="product-item__price">${price}</span>
      </Link>
    </li>
  );
}
