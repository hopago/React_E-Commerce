import { Resolver } from "./types.js";

const cartResolvers: Resolver = {
  Query: {
    cart: (_1, _2, { db }) => {
      return db.cart;
    },
  },
  Mutation: {
    addCart: (_: any, { id }, { db }) => {
      if (!id) throw Error("상품 ID가 필요합니다...");

      const targetProduct = db.products.find((item) => item.id === id);
      if (!targetProduct) throw new Error("상품이 없습니다...");

      let newItem;

      const findCartIndex = db.cart.findIndex(item => item.id === id);
      if (findCartIndex) {
        newItem = {
          ...db.cart[findCartIndex],
          amount: (db.cart[findCartIndex].amount || 0) + 1,
        };

        db.cart.splice(findCartIndex, 1, newItem);
      } else {
        newItem = {
          id,
          product: {
            ...targetProduct,
          },
          amount: 1,
        };

        db.cart.push(newItem);
      }

      return newItem;
    },
    updateCart: (_: any, { id, amount }, { db }) => {
      const newCart = [...db.cart];
      const findIndex = newCart.findIndex((item) => item.id === id);
      if (!findIndex) throw new Error("없는 데이터입니다...");

      const newItem = {
        ...newCart[findIndex],
        amount,
      };
      newCart[findIndex] = newItem;
      db.cart = newCart;

      return newItem;
    },
    deleteCart: (_: any, { id }, { db }) => {
      const newData = [...db.cart];
      const findIndex = db.cart.findIndex((item) => item.id === id);
      if (!findIndex) throw new Error("없는 데이터입니다...");

      delete newData[findIndex];
      db.cart = newData;

      return id;
    },
    executePayment: (_: any, { ids }, { db }) => {
      const newCartData = db.cart.filter((cartItem) => {
        !ids.includes(cartItem.id);
      });

      db.cart = newCartData;

      return ids;
    },
  },
  CartItem: {
    product: (cartItem, _, { db }) => {
      return db.products.find(product => product.id === cartItem.id);
    },
  },
};

export default cartResolvers;
