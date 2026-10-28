import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { count, total } = useCart();
  return (
    <header className="top">
      <div className="wrap top-in">
        <Link to="/" className="brand">
          <span className="brand-mark">🍴</span> Cafeccino
        </Link>
        <nav aria-label="Main">
          <NavLink to="/" end>Menu</NavLink>
          <NavLink to="/cart" className="cart-link" aria-label={`Cart, ${count} items`}>
            Cart <span className="badge" key={count}>{count}</span>
            <span className="cart-total">Rs {total}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
