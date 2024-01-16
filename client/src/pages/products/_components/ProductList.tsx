import { useQuery } from "react-query";
import "../../scss/index.scss";
import GET_PRODUCTS, { Product } from "../../../graphql/products/products";
import {
  QueryKeys,
  graphqlFetcher,
} from "../../../lib/react-query/queryClient";
import ProductItem from "./ProductItem";

type QueryResult = {
  products: Product[];
};

export default function ProductList() {
  const { data } = useQuery<QueryResult>(QueryKeys.PRODUCTS, () =>
    graphqlFetcher<QueryResult>(GET_PRODUCTS)
  );

  if (!data) {
    return null;
  }

  return (
    <div>
      <ul className="products">
        {data?.products.map((product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>
  );
}
