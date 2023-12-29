import { useQuery } from "react-query"
import { QueryKeys, fetcher } from "../../lib/react-query/queryClient"
import { useParams } from "react-router-dom";
import ProductDetail from './_components/ProductDetail'

export default function ProductsId() {
  const { id } = useParams();

  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    fetcher({ method: "GET", path: `/products/${id}` })
  );

  if (!data) {
    return null;
  }

  return (
    <>
      <h1>상품 상세</h1>
      <ProductDetail product={data} />
    </>
  );
}
