import { graphql } from "msw";
import GET_PRODUCTS, { GET_PRODUCT } from "../graphql/products/products";
import {
  ADD_CART,
  Cart,
  DELETE_CART,
  GET_CART,
  UPDATE_CART,
} from "../graphql/cart/cart";
import { EXECUTE_PAYMENT } from "../graphql/payment/payment";

const mockProducts = (() =>
  Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1 + "",
    imageUrl: `https://placeimg.com/640/480/${i + 1}`,
    price: 50000,
    title: `임시상품${i + 1}`,
    description: `임시상세내용${i + 1}`,
    createdAt: new Date(1645735501883 + i * 100 * 60 * 60 * 10).toString(),
  })))();

let cartData: { [key: string]: Cart } = {};

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx) => {
    return res(
      ctx.data({
        products: mockProducts,
      })
    );
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const found = mockProducts.find((item) => item.id === req.variables.id);
    return res(ctx.data(found));
  }),
  graphql.query(GET_CART, (req, res, ctx) => {
    return res(ctx.data(cartData));
  }),
  graphql.mutation(ADD_CART, (req, res, ctx) => {
    const updatedCart = { ...cartData };
    const id = req.variables.id;

    const targetProduct = mockProducts.find(
      (item) => item.id === req.variables.id
    );
    if (!targetProduct) {
      throw new Error("상품이 없습니다");
    }

    const newItem = {
      ...targetProduct,
      amount: (updatedCart[id].amount || 0) + 1,
    };
    updatedCart[id] = newItem;
    cartData = updatedCart;

    return res(
      ctx.data({
        newItem,
      })
    );
  }),
  graphql.mutation(UPDATE_CART, (req, res, ctx) => {
    const updatedCart = { ...cartData };
    const { id, amount } = req.variables;
    if (!updatedCart[id]) {
      throw new Error("없는 데이터입니다.");
    }

    const newItem = {
      ...updatedCart[id],
      amount,
    };
    updatedCart[id] = newItem;

    return res(
      ctx.data({
        newItem,
      })
    );
  }),
  graphql.mutation(DELETE_CART, ({ variables: { id } }, res, ctx) => {
    const newData = { ...cartData };
    delete newData[id];
    cartData = newData;
    return res(ctx.data(id));
  }),
  graphql.mutation(EXECUTE_PAYMENT, ({ variables }, res, ctx) => {
    console.log(variables);
    return res();
  }),
];
