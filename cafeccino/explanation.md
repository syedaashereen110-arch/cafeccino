# ☕ Cafeccino – Campus Canteen Menu

A phone-friendly web page where students can browse today's menu, open any dish, and build an order. This is a **frontend-only** React project made for the Advanced Computer Programming course.

---

## 👩‍🎓 Student details

- **Name:** Syeda Shereen Hassan
- **Roll No:** SU92-BSCSM-F24-272
- **Section:** 5E
- **Course:** Advanced Computer Programming
- **Assignment:** 1 – Campus Canteen Menu (frontend only)

---

## 📌 About the assignment

- A campus canteen needs a phone-friendly page for students
- Students should be able to browse today's menu, open an item, and build an order
- The menu must come from a local JSON file and must **not** be typed into the page
- The cart count in the header must stay correct on every screen

---

## Loom Video Link:

https://www.loom.com/share/3a6161dcd06d4172975458f9914e7a75

---

## 🍽️ What this project does

- Shows today's menu with food photos, prices and short descriptions
- Search for a dish by name
- Filter dishes by category (Rice, Fast Food, Desi, Snacks, Drinks, Sweets)
- Mark dishes as favourites and view only favourites
- Open a details page for any dish
- Add dishes to a tray, change quantities, remove items, and see the total
- Header shows the live cart count and total on every page

---

## ✅ Requirement checklist (for evaluation)

### 1. Responsive layout (phone, tablet, desktop)
- **Where:** `src/styles.css`
- Uses **Flexbox** (header, filters, cart rows) and **CSS Grid** (menu cards, cart layout, details page)
- Uses **media queries** at 600px and 900px:
  - Phone: 2 cards per row
  - Tablet: 3 cards per row
  - Desktop: 4 cards per row
- Uses **semantic HTML**: `header`, `main`, `nav`, `section`, `article`, `aside`
- **How to check:** open the page and resize the browser window, or open it on a phone

### 2. Reusable components with props and `useState`
- **`MenuList`** (`src/components/MenuList.jsx`) – receives `items` as a prop and shows the grid
- **`ItemCard`** (`src/components/ItemCard.jsx`) – receives `item`, `isFav`, `onFav`, `onAdd` as props
- **`Cart`** (`src/components/Cart.jsx`) – shows tray items, quantity buttons and the summary
- **Search and category filter** (`src/pages/MenuPage.jsx`) – uses `useState` for the search text, selected category and favourites filter
- **Favourite toggle** – the heart button on every card and on the details page
- **How to check:** type in the search box, tap a category, and tap a heart

### 3. Loading the menu with `useEffect` + `fetch` + `async/await`
- **Where:** `src/App.jsx`
- The menu is loaded from `public/menu.json`, not typed in the page
- `useEffect` runs once when the app opens and calls an `async` function
- `fetch` reads the file and `await` waits for the result
- **Loading message:** a spinner with "Heating up today's menu…"
- **Error message:** shown if the file cannot be loaded
- **How to check:** rename `menu.json` temporarily and refresh to see the error message

### 4. React Router screens
- **Where:** `src/App.jsx` (routes) and `src/pages/`
- `/` → Menu page (`MenuPage.jsx`)
- `/item/:id` → Item details page (`ItemPage.jsx`)
- `/cart` → Cart page (`CartPage.jsx`)
- Any other address shows a "Page not found" message

### 5. Shared cart with Context
- **Where:** `src/context/CartContext.jsx`
- One `CartProvider` wraps the whole app (in `src/main.jsx`)
- It holds the cart items, favourites, item count and total price
- Functions provided: `addToCart`, `changeQty`, `removeItem`, `clearCart`, `toggleFav`
- The header, menu cards, details page and cart page all read from the same Context
- Adding an item updates the **header count** and the **cart total** instantly, with **no page reload**
- **How to check:** tap "+" on any dish and watch the header number change, then open the cart page

---

## ✨ Extra things added

- Real food photos for every dish
- A cart bar at the bottom of the screen showing count and total
- A small "added to your tray" pop-up
- Quantity buttons (+ / −) and a remove button in the cart
- A "Place order" button with a thank-you message
- Friendly messages for an empty cart and for no search results
- Keyboard-friendly buttons and image descriptions (`alt` text) for accessibility

---

## 🧰 Technologies used

- **React 18** – builds the pages from reusable components
- **React Router** – moves between the three screens
- **React Context** – shares the cart across screens
- **Vite** – runs and builds the project
- **Plain CSS** – no CSS library

---

## 📁 Folder structure

```
cafeccino/
├── public/
│   ├── menu.json            ← all menu data
│   └── images/              ← food photos
├── src/
│   ├── components/
│   │   ├── Header.jsx       ← logo, cart count and total
│   │   ├── MenuList.jsx     ← grid of dishes
│   │   ├── ItemCard.jsx     ← one dish card
│   │   └── Cart.jsx         ← tray and order summary
│   ├── context/
│   │   └── CartContext.jsx  ← shared cart and favourites
│   ├── pages/
│   │   ├── MenuPage.jsx     ← search, filters and menu
│   │   ├── ItemPage.jsx     ← dish details
│   │   └── CartPage.jsx     ← cart screen
│   ├── App.jsx              ← loads the menu and sets up routes
│   ├── main.jsx             ← starts the app
│   └── styles.css           ← all the styling
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔄 How the app works (simple flow)

- The app opens and `App.jsx` fetches `menu.json`
- While waiting, a loading message is shown
- When the data arrives, the menu is passed to the pages as a prop
- `MenuPage` filters the list using search text and category, then gives it to `MenuList`
- `MenuList` creates one `ItemCard` for every dish
- Tapping "+" calls `addToCart` from Context, so the cart updates everywhere at once
- The header and cart bar read the count and total from the same Context

---

## 🚀 How to run the project

1. Install **Node.js** (LTS) from [nodejs.org](https://nodejs.org)
2. Open the `cafeccino` folder in VS Code
3. Open the terminal and run:
   ```
   npm install --legacy-peer-deps
   ```
4. Start the project:
   ```
   npm run dev
   ```
5. Open the link shown in the terminal (usually `http://localhost:5173`)

### 📱 To test on a phone
- Run `npm run dev -- --host`
- Keep the phone and laptop on the **same WiFi**
- Open the `Network` link from the terminal on the phone

### ⚠️ If PowerShell blocks npm
Run this once, then try again:
```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

---

## 🏁 Conclusion

- Cafeccino meets every point of the assignment: a responsive layout, reusable components, menu loading with `useEffect` + `fetch` + `async/await`, three React Router screens, and a cart shared with Context
- The menu comes from a local `menu.json` file, so dishes can be changed without touching the code
- The header cart count and the cart total stay correct on every screen and update instantly, with no page reload
- The page works well on phone, tablet and desktop
- Through this project I practised building reusable components, passing data with props, managing state with `useState`, loading data with `async/await`, routing between screens, and sharing state with Context
- As a frontend-only project, orders are not sent to a server and the cart resets on refresh; a backend and saved orders could be added in future
