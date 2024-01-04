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

let cartData = [
  {
    id: "1",
    amount: 1,
  },
  {
    id: "2",
    amount: 2,
  },
];

const cartResolvers: Resolver = {
  Query: {
    cart: () => {
      return cartData;
    },
  },
  Mutation: {
    addCart: (_: any, { id }) => {
      const newCartData = [...cartData];
      const findIndex = mockProducts.findIndex((item) => item.id === id);
      const targetProduct = mockProducts.find((item) => item.id === id);
      if (!targetProduct) throw new Error("상품이 없습니다...");

      const newItem = {
        ...targetProduct,
        amount: (newCartData[findIndex]?.amount || 0) + 1,
      };
      newCartData[findIndex] = newItem;
      cartData = newCartData;

      return newItem;
    },
    updateCart: (_: any, { id, amount }) => {
      const newData = [...cartData];
      const findIndex = newData.findIndex((item) => item.id === id);
      if (!findIndex) throw new Error("없는 데이터입니다...");

      const newItem = {
        ...newData[findIndex],
        amount,
      };
      newData[findIndex] = newItem;
      cartData = newData;

      return newItem;
    },
    deleteCart: (_: any, { id }) => {
      const newData = [...cartData];
      const findIndex = cartData.findIndex((item) => item.id === id);
      if (!findIndex) throw new Error("없는 데이터입니다...");

      delete newData[findIndex];
      cartData = newData;

      return id;
    },
    executePayment: (_: any, { ids }) => {
      const newCartData = cartData.filter((cartItem) => {
        !ids.includes(cartItem.id);
      });

      cartData = newCartData;

      return ids;
    },
  },
};

export default cartResolvers;
