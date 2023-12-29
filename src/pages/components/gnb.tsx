import { Link } from "react-router-dom";

export default function GNB() {
  return (
    <nav className="gnb">
      <ul>
        <li>
          <Link to="/" className="link">
            홈페이지
          </Link>
        </li>
        <li>
          <Link to="/products" className="link">
            상품목록
          </Link>
        </li>
        <li>
          <Link to="/cart" className="link">
            장바구니
          </Link>
        </li>
      </ul>
    </nav>
  );
}
