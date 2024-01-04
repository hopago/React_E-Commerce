import { Resolver } from "./types.js";

const mockProducts = (() => {
  return Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1 + "",
    imageUrl: `https://picsum.photos/id/${i + 10}/200/150`,
    price: 50000,
    title: `임시상품 ${i + 1}`,
    description: `임시상세내용 ${i + 1}`,
    createdAt: new Date(1645735501863 + i + 1000 * 10).toString(),
  }));
})();

const productResolvers: Resolver = {
  Query: {
    products: () => {
      return mockProducts;
    },
    product: (_: any, { id }) => {
      const found = mockProducts.find((product) => product.id === id);
      if (!found) return null;
      return found;
    },
  },
  Mutation: {},
};

export default productResolvers;