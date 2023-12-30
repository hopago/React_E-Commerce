import { useQuery } from "react-query"
import { QueryKeys, graphqlFetcher } from "../../lib/react-query/queryClient"
import { useParams } from "react-router-dom";
import ProductDetail from './_components/ProductDetail'
import { GET_PRODUCT, Product } from "../../graphql/products/products";

export default function ProductsId() {
  const { id } = useParams();

  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    graphqlFetcher<Product>(GET_PRODUCT, { id })
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
