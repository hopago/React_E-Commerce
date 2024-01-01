import { useRecoilValue } from "recoil";
import { checkedCartState } from "../../../recoils/cart";
import PaymentItem from "./PaymentItem";
import { useNavigate } from "react-router-dom";

export default function PaymentPrice() {
  const checkedItems = useRecoilValue(checkedCartState);

  const navigate = useNavigate();

  const totalPrice = checkedItems.reduce((res, { price, amount }) => {
    res = price * amount;
    return res;
  }, 0);

  const handleRoute = () => {
    if (checkedItems.length) {
      navigate("/payment");
    } else {
      alert("선택 상품이 없습니다.");
    }
  };

  return (
    <div className="cart-paymentPrice">
      <ul>
        {checkedItems.map((item) => (
          <li>
            <PaymentItem {...item} key={item.id} />
            <p>수량: {item.amount}</p>
            <p>금액: {item.price * item.amount}</p>
          </li>
        ))}
      </ul>
      <p>{totalPrice}</p>
      <button onClick={handleRoute}>결제하기</button>
    </div>
  );
}
