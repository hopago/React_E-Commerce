import { Link } from "react-router-dom";
import "../../scss/index.scss";
import { Product } from "../../../graphql/products/products";
import { useMutation } from "react-query";
import { QueryKeys, graphqlFetcher } from "../../../lib/react-query/queryClient";
import { ADD_CART } from "../../../graphql/cart/cart";

export default function ProductItem({
  imageUrl,
  id,
  price,
  title,
  description,
}: Product) {
  const { mutate: addCart } = useMutation((id: string) =>
    graphqlFetcher(ADD_CART, { id })
  );

  return (
    <li className="product-item">
      <Link className="link" to={`/products/${id}`}>
        <span className="product-item__title">{title}</span>
        <p className="product-description">{description}</p>
        <img className="product-item__image" src={imageUrl} />
        <span className="product-item__price">${price}</span>
      </Link>
      <button className="product-item__add-cart" onClick={() => addCart(id)}>장바구니 담기</button>
      <span>{}</span>
    </li>
  );
}
