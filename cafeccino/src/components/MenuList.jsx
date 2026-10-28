import ItemCard from "./ItemCard";
import { useCart } from "../context/CartContext";

export default function MenuList({ items }) {
  const { favs, toggleFav, addToCart } = useCart();
  if (!items.length)
    return <div className="state">No dishes match your search. Try another word or category.</div>;
  return (
    <section className="grid" aria-label="Menu items">
      {items.map((it) => (
        <ItemCard
          key={it.id}
          item={it}
          isFav={favs.includes(it.id)}
          onFav={() => toggleFav(it.id)}
          onAdd={() => addToCart(it)}
        />
      ))}
    </section>
  );
}
