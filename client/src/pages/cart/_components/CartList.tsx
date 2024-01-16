import { Cart } from "../../../graphql/cart/cart";
import "../../scss/cart.scss";
import { SyntheticEvent, createRef, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { checkedCartState } from "../../../recoils/cart";
import PaymentPrice from "../../components/payment/PaymentPrice";
import { useNavigate } from "react-router-dom";
import { CartItems } from "..";
import CartItem from "./CartItem";

type Props = {
  items: CartItems;
};

export default function CartList({ items }: Props) {
  const [checkedData, setCheckedData] = useRecoilState(checkedCartState);
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>();

  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>());

  const setAllCheckedFromItems = () => {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll("select-item").length;
    const allChecked = selectedCount === items.length;
    formRef.current.querySelector<HTMLInputElement>(".select-all")!.checked =
      allChecked;
  };

  const setItemsCheckedFromAll = (targetInput: HTMLInputElement) => {
    const allChecked = targetInput.checked;
    checkboxRefs.forEach((inputElem) => {
      inputElem.current!.checked = allChecked;
    });
  };

  const handleCheckboxChanged = (e?: SyntheticEvent) => {
    if (!formRef.current) return;

    const targetInput = e?.target as HTMLInputElement;
    if (targetInput && targetInput.classList.contains("select-all")) {
      setItemsCheckedFromAll(targetInput);
    } else {
      setAllCheckedFromItems();
    }

    const data = new FormData(formRef.current);
    setFormData(data);
  };

  const handleSubmit = () => {
    if (checkedData.length) {
      navigate("/payment");
    } else {
      alert("선택 상품이 없습니다.");
    }
  };

  useEffect(() => {
    checkedData.forEach((item) => {
      const itemRef = checkboxRefs.find(
        (ref) => ref.current!.dataset.id === item.id
      );
      if (itemRef) {
        itemRef.current!.checked = true;
      }
      setAllCheckedFromItems();
    });
  }, []);

  useEffect(() => {
    const checkedItems = checkboxRefs.reduce<Cart[]>((result, ref, i) => {
      if (ref.current!.checked) {
        result.push(items[i]);
      }

      return result;
    }, []);
    setCheckedData(checkedItems);
  }, [items, formData]);

  return (
    <div>
      <form ref={formRef} onChange={handleCheckboxChanged}>
        <label>
          <input className="select-all" name="select-all" type="checkbox" />
          전체선택
        </label>
        <ul className="cart">
          {items.map((item, i) => (
            <CartItem
              item={item}
              key={item.id}
              ref={checkboxRefs[i]}
            />
          ))}
        </ul>
      </form>
      <PaymentPrice handleSubmit={handleSubmit} submitTitle="결제창으로 이동" />
    </div>
  );
}
