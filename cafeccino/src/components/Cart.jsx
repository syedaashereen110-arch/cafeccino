import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, total, count, changeQty, removeItem, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  if (placed)
    return (
      <div className="state ok">
        <div className="big">🎉</div>
        Order placed! Your food will be ready at the counter shortly.
        <Link to="/" className="btn" onClick={() => setPlaced(false)}>Order more</Link>
      </div>
    );

  if (!cart.length)
    return (
      <div className="state">
        <div className="big">🛒</div>
        Your tray is empty.
        <Link to="/" className="btn">Browse the menu</Link>
      </div>
    );

  return (
    <div className="cart-layout">
      <ul className="lines">
        {cart.map((i) => (
          <li key={i.id} className="line">
            <span className="line-art" style={{ background: i.color }}>{i.emoji}<img src={encodeURI(`/images/${i.image}`)} alt={i.name} onError={(e) => (e.currentTarget.style.display = "none")} /></span>
            <div className="line-info">
              <strong>{i.name}</strong>
              <span className="muted">Rs {i.price} each</span>
            </div>
            <div className="qty">
              <button onClick={() => changeQty(i.id, -1)} aria-label={`Less ${i.name}`}>−</button>
              <span>{i.qty}</span>
              <button onClick={() => changeQty(i.id, 1)} aria-label={`More ${i.name}`}>+</button>
            </div>
            <strong className="line-sum">Rs {i.price * i.qty}</strong>
            <button className="x" onClick={() => removeItem(i.id)} aria-label={`Remove ${i.name}`}>✕</button>
          </li>
        ))}
      </ul>
      <aside className="summary">
        <h2>Order summary</h2>
        <div className="row"><span>Items</span><span>{count}</span></div>
        <div className="row"><span>Subtotal</span><span>Rs {total}</span></div>
        <div className="row grand"><span>Total</span><span>Rs {total}</span></div>
        <button className="btn full" onClick={() => { clearCart(); setPlaced(true); }}>Place order</button>
        <button className="btn ghost full" onClick={clearCart}>Clear tray</button>
      </aside>
    </div>
  );
}
