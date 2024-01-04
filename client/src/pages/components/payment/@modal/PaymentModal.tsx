import { ReactChild } from "react";
import { createPortal } from "react-dom";

type PaymentModalProps = {
  show: boolean,
  onProceed: () => void;
  onCancel: () => void;
}

const ModalPortal = ({ children }: { children: ReactChild }) => {
  return createPortal(children, document.getElementById("modal")!);
};

export default function PaymentModal({
  show,
  onProceed,
  onCancel,
}: PaymentModalProps) {
  return show ? (
    <ModalPortal>
      <div className={`modal ${show ? "show" : ""}`}>
        <div className="modal__inner">
          <p>정말 결제할까요?</p>
          <button onClick={onProceed}>예</button>
          <button onClick={onCancel}>아니오</button>
        </div>
      </div>
    </ModalPortal>
  ) : null;
}
