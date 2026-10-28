import { useState } from "react";
import MenuList from "../components/MenuList";
import { useCart } from "../context/CartContext";

const ICONS = { All: "✨", Rice: "🍛", "Fast Food": "🍔", Desi: "🍲", Snacks: "🥟", Drinks: "🥤", Sweets: "🍫" };

export default function MenuPage({ menu }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [onlyFavs, setOnlyFavs] = useState(false);
  const { favs } = useCart();

  const categories = ["All", ...new Set(menu.map((m) => m.category))];
  const shown = menu.filter(
    (m) =>
      (category === "All" || m.category === category) &&
      (!onlyFavs || favs.includes(m.id)) &&
      m.name.toLowerCase().includes(query.trim().toLowerCase())
  );
  const stars = [1, 3, 11].map((id) => menu.find((m) => m.id === id)).filter(Boolean);


  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>Hungry between classes?</h1>
          <p>Fresh food, ready when the bell rings. Pick your favourites and build your tray in seconds.</p>
          <input type="search" placeholder="Search biryani, chai, pizza…" value={query}
            onChange={(e) => setQuery(e.target.value)} aria-label="Search menu" />
        </div>
        <div className="collage" aria-hidden="true">
          {stars.map((s) => (
            <div className="snap" key={s.id} style={{ background: s.color }}>
              <img src={encodeURI(`/images/${s.image}`)} alt="" />
            </div>
          ))}
        </div>
      </section>

      <div className="filters" role="group" aria-label="Categories">
        {categories.map((c) => (
          <button key={c} className={`pill ${category === c ? "on" : ""}`} onClick={() => setCategory(c)}>
            {ICONS[c] || "🍽️"} {c}
          </button>
        ))}
        <button className={`pill fav ${onlyFavs ? "on" : ""}`} onClick={() => setOnlyFavs(!onlyFavs)}>
          ♥ Favourites {favs.length > 0 && `(${favs.length})`}
        </button>
      </div>
      <MenuList items={shown} />
    </>
  );
}
