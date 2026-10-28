import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useCart } from "./context/CartContext";
import Header from "./components/Header";
import MenuPage from "./pages/MenuPage";
import ItemPage from "./pages/ItemPage";
import CartPage from "./pages/CartPage";

export default function App() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { toast, count, total } = useCart();
  const { pathname } = useLocation();

  useEffect(() => {
    async function loadMenu() {
      try {
        const res = await fetch("/menu.json");
        if (!res.ok) throw new Error(`Server replied ${res.status}`);
        setMenu(await res.json());
      } catch (err) {
        setError(err.message || "Could not load the menu.");
      } finally {
        setLoading(false);
      }
    }
    loadMenu();
  }, []);

  return (
    <>
      <Header />
      <main className="wrap">
        {loading && (
          <div className="state" role="status">
            <div className="spinner" /> Heating up today’s menu…
          </div>
        )}
        {error && (
          <div className="state err" role="alert">
            Menu failed to load: {error}. Refresh the page to try again.
          </div>
        )}
        {!loading && !error && (
          <Routes>
            <Route path="/" element={<MenuPage menu={menu} />} />
            <Route path="/item/:id" element={<ItemPage menu={menu} />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<div className="state">Page not found.</div>} />
          </Routes>
        )}
      </main>
      {toast && <div className="toast" key={toast.id} role="status">✓ {toast.text}</div>}
      {count > 0 && pathname !== "/cart" && (
        <Link to="/cart" className="cart-bar">
          <span className="cart-bar-count">{count}</span>
          <span>View your tray</span>
          <strong>Rs {total}</strong>
        </Link>
      )}
    </>
  );
}
