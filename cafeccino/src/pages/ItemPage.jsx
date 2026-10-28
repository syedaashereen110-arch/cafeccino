import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ItemPage({ menu }) {
  const { id } = useParams();
  const nav = useNavigate();
  const { addToCart, favs, toggleFav } = useCart();
  const item = menu.find((m) => m.id === Number(id));

  if (!item)
    return (
      <div className="state">
        That dish isn’t on today’s menu. <Link to="/" className="btn">Back to menu</Link>
      </div>
    );
  const isFav = favs.includes(item.id);

  return (
    <div className="detail">
      <button className="back" onClick={() => nav(-1)}>‹ Back</button>
      <div className="detail-art" style={{ background: item.color }}>
        <span>{item.emoji}</span>
        <img src={encodeURI(`/images/${item.image}`)} alt={item.name} onError={(e) => (e.currentTarget.style.display = "none")} />
      </div>
      <div className="detail-info">
        <span className="chip dark">{item.category}</span>
        <h1>{item.name}</h1>
        <p className="lead">{item.desc}</p>
        <p className="muted">Ready in about {item.prep}</p>
        <div className="detail-price">Rs {item.price}</div>
        <div className="detail-actions">
          <button className="btn" onClick={() => addToCart(item)}>Add to tray</button>
          <button className={`btn ghost ${isFav ? "on" : ""}`} onClick={() => toggleFav(item.id)}>
            {isFav ? "♥ Favourited" : "♡ Favourite"}
          </button>
          <Link to="/cart" className="btn ghost">View tray</Link>
        </div>
      </div>
    </div>
  );
}
