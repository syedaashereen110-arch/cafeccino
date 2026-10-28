import { createContext, useContext, useRef, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favs, setFavs] = useState([]);
  const [toast, setToast] = useState(null);
  const timer = useRef();

  const addToCart = (item) => {
    setCart((c) =>
      c.some((i) => i.id === item.id)
        ? c.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...c, { ...item, qty: 1 }]
    );
    setToast({ id: Date.now(), text: `${item.name} added to your tray` });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 1800);
  };
  const changeQty = (id, d) =>
    setCart((c) => c.map((i) => (i.id === id ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0));
  const removeItem = (id) => setCart((c) => c.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);
  const toggleFav = (id) => setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const count = cart.reduce((n, i) => n + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{ cart, favs, toast, count, total, addToCart, changeQty, removeItem, clearCart, toggleFav }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
