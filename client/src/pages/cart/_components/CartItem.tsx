import { useMutation, useQuery } from "react-query";
import { DELETE_CART, GET_CART, UPDATE_CART } from "../../../graphql/cart/cart";
import {
  QueryKeys,
  getQueryClient,
  graphqlFetcher,
} from "../../../lib/react-query/queryClient";
import { ForwardedRef, SyntheticEvent, forwardRef, useEffect, useState } from "react";
import { Product } from "../../../graphql/products/products";
import { CartQueryResult } from "..";

type Props = {
  item: {
    id: string;
    amount: number;
    product?: Product;
  };
};

type NewValue = {
  updateCart: {
    amount: number;
    id: string;
    product: Product;
  };
};

function CartItem({ item }: Props, ref: ForwardedRef<HTMLInputElement>) {
  if (!item.product) return null;

  const { id, amount, product } = item;
  const { price, title, imageUrl } = product;

  const [cartData, setCartData] = useState<CartQueryResult>();

  const { data, isSuccess } = useQuery<CartQueryResult>(
    QueryKeys.CART,
    () => graphqlFetcher(GET_CART),
    {
      staleTime: 600 * 1000,
      cacheTime: 600 * 1000,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setCartData(data);
    }
  }, [isSuccess]);

  const queryClient = getQueryClient();
  const { mutate: updateCart } = useMutation<
    NewValue,
    unknown,
    { addCartId: string; amount: number }
  >(
    ({ addCartId, amount }: { addCartId: string; amount: number }) =>
      graphqlFetcher(UPDATE_CART, { addCartId, amount }),
    {
      onMutate: async ({ addCartId, amount }) => {
        await queryClient.cancelQueries(QueryKeys.CART);
        const { cart: prevCart } = queryClient.getQueryData<CartQueryResult>(
          QueryKeys.CART
        ) || cartData!;
        if (!prevCart.length) return null;

        const targetIndex = prevCart.findIndex(
          (cartItem) => cartItem.id === addCartId
        );
        if (targetIndex === undefined || targetIndex < 0) return prevCart;

        const newCart = [...prevCart];
        newCart.splice(targetIndex, 1, { ...newCart[targetIndex], amount });
        try {
          queryClient.setQueryData(QueryKeys.CART, { cart: newCart });
        } catch (err) {
          console.log(err);
        }

        return prevCart;
      },
      onSuccess: ({ updateCart }) => {
        const { cart: prevCart } = queryClient.getQueryData<CartQueryResult>(
          QueryKeys.CART
        ) || cartData!;
        if (!prevCart.length) {
          console.log(prevCart);
          return;
        }

        const targetIndex = prevCart.findIndex(
          (cart) => cart.id === updateCart.id
        );
        if (targetIndex === -1) return console.log(targetIndex);

        const newCart = [...prevCart];
        newCart.splice(targetIndex, 1, updateCart);
        try {
          queryClient.setQueryData(QueryKeys.CART, { cart: newCart });
        } catch (err) {
          console.log(err);
        }
      },
    }
  );
  const { mutate: deleteCart } = useMutation(
    ({ deleteCartId }: { deleteCartId: string }) =>
      graphqlFetcher<typeof id>(DELETE_CART, { deleteCartId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.CART);
      },
    }
  );

  const handleUpdateAmount = (e: SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    if (amount < 1) return;
    updateCart({ addCartId: id, amount });
  };
  const handleDeleteItem = () => {
    deleteCart({ deleteCartId: id });
  };

  return (
    <li className="cart-item">
      <input
        className="cart-item__checkbox"
        type="checkbox"
        name="select-item"
        ref={ref}
        data-id={id}
      />
      <img src={imageUrl} alt={`cart${id}`} />
      <p className="cart-item__price">{price}</p>
      <p className="cart-item__title">{title}</p>
      <input
        type="number"
        className="cart-item__amount"
        value={amount}
        onChange={handleUpdateAmount}
        min={1}
      />
      <button
        type="button"
        className="cart-item__button"
        onClick={handleDeleteItem}
      >
        삭제
      </button>
    </li>
  );
}

export default forwardRef(CartItem);
