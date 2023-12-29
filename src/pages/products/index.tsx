import { useQuery } from "react-query";
import { QueryKeys, fetcher } from "../../lib/react-query/queryClient";
import ProductItem from "./_components/ProductItem";
import '../scss/index.scss';

export default function ProductsIndex() {
  const { data } = useQuery(QueryKeys.PRODUCTS, () =>
    fetcher({
      method: "GET",
      path: "/products",
    })
  );

  return (
    <div>
      <ul className="products">
        {data?.map((product: Product) => (
          <ProductItem {...product} key={product.id} />
        ))}
      </ul>
    </div>
  );
}
