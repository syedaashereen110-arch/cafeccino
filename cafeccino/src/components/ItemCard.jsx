import { Link } from "react-router-dom";

export default function ItemCard({ item, isFav, onFav, onAdd }) {
  return (
    <article className="card">
      <Link to={`/item/${item.id}`} className="card-art" style={{ background: item.color }}>
        <span className="emoji">{item.emoji}</span>
        <img src={encodeURI(`/images/${item.image}`)} alt={item.name} loading="lazy" onError={(e) => (e.currentTarget.style.display = "none")} />
        <span className="chip">⏱ {item.prep}</span>
      </Link>
      <button className={`heart ${isFav ? "on" : ""}`} onClick={onFav} aria-pressed={isFav}
        aria-label={isFav ? "Remove from favourites" : "Add to favourites"}>
        {isFav ? "♥" : "♡"}
      </button>
      <div className="card-body">
        <h3>{item.name}</h3>
        <p className="muted desc">{item.desc}</p>
        <div className="card-foot">
          <strong className="price">Rs {item.price}</strong>
          <button className="add" onClick={onAdd} aria-label={`Add ${item.name} to tray`}>+</button>
        </div>
      </div>
    </article>
  );
}
