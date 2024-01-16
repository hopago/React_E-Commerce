import { useRecoilState } from "recoil";
import { checkedCartState } from "../../../recoils/cart";
import PaymentPrice from "../../components/payment/PaymentPrice";
import PaymentModal from "../../components/payment/@modal/PaymentModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { graphqlFetcher } from "../../../lib/react-query/queryClient";
import { EXECUTE_PAYMENT } from "../../../graphql/payment/payment";

type PayInfo = string[]

export default function Payment() {
  const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);

  const { mutate: executePayment } = useMutation((ids: PayInfo) =>
    graphqlFetcher(EXECUTE_PAYMENT, { ids })
  );

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const onProceed = () => {
    // 결제 로직...
    console.log("execute...");

    const ids: PayInfo = checkedCartData.map(({ id }) => id);

    try {
      executePayment(ids, {
        onSuccess: () => {
          alert("결제 완료되었습니다.");
        }
      });
    } catch (err) {
      console.log(err);
    }

    setCheckedCartData([]);
    navigate("/products", { replace: true });
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
