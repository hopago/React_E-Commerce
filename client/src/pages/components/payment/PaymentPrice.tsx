import { useRecoilValue } from "recoil";
import { checkedCartState } from "../../../recoils/cart";
import PaymentItem from "./PaymentItem";
import { SyntheticEvent } from "react";

export default function PaymentPrice({
  handleSubmit,
  submitTitle
}: {
  handleSubmit: (e: SyntheticEvent) => void;
  submitTitle: string;
}) {
  const checkedItems = useRecoilValue(checkedCartState);

  const totalPrice = checkedItems.reduce((res, { price, amount }) => {
    res = price * amount;
    return res;
  }, 0);

  return (
    <div className="cart-paymentPrice">
      <ul>
        {checkedItems.map((item) => (
          <li key={item.id}>
            <PaymentItem {...item} />
            <p>수량: {item.amount}</p>
            <p>금액: {item.price * item.amount}</p>
          </li>
        ))}
      </ul>
      <p>{totalPrice}</p>
      <button onClick={handleSubmit}>{submitTitle}</button>
    </div>
  );
}
