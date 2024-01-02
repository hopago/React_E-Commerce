import { useRecoilState } from "recoil";
import { checkedCartState } from "../../../recoils/cart";
import PaymentPrice from "../../components/payment/PaymentPrice";
import PaymentModal from "../../components/payment/@modal/PaymentModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { graphqlFetcher } from "../../../lib/react-query/queryClient";
import { EXECUTE_PAYMENT } from "../../../graphql/payment/payment";

type PayInfo = {
  id: string;
  amount: number;
}

type PaymentInfo = PayInfo[]

export default function Payment() {
  const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);

  const { mutate: executePayment } = useMutation((payInfos: PaymentInfo) =>
    graphqlFetcher(EXECUTE_PAYMENT, payInfos)
  );

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const onProceed = () => {
    // 결제

    const payInfo = checkedCartData.map(({ id, amount }) => ({ id, amount }));
    executePayment(payInfo);

    setCheckedCartData([]);
    navigate("/products", { replace: true }); // root or 결제완료 창으로 이동
  };

  const onCancel = () => {
    setShow(false);
  };

  return (
    <>
      <PaymentPrice handleSubmit={showModal} submitTitle="결제하기" />
      <PaymentModal onCancel={onCancel} onProceed={onProceed} show={show} />
    </>
  );
}
