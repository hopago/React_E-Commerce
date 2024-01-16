import { useQuery } from "react-query"
import { QueryKeys, graphqlFetcher } from "../../lib/react-query/queryClient"
import { useParams } from "react-router-dom";
import ProductDetail from './_components/ProductDetail'
import { GET_PRODUCT, Product } from "../../graphql/products/products";

type QueryResult = {
  product: Product
}

export default function ProductsId() {
  const { id } = useParams();

  const { data } = useQuery<QueryResult>([QueryKeys.PRODUCTS, id], () =>
    graphqlFetcher<QueryResult>(GET_PRODUCT, { productId: id })
  );

  if (!data) {
    return null;
  }

  return (
    <>
      <h1>상품 상세</h1>
      <ProductDetail product={data.product} />
    </>
  );
}
