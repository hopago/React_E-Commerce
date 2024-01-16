import { useQuery } from "react-query";
import '../../scss/index.scss';
import GET_PRODUCTS, { Product } from "../../../graphql/products/products";
import {
  QueryKeys,
  graphqlFetcher,
} from "../../../lib/react-query/queryClient";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () =>
    graphqlFetcher<Product[]>(GET_PRODUCTS)
  );

  if (!data) {
    return null;
  }

  return (
    <div>
      <ul className="products">
        {data?.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>
  );
}
