# 📸 Photo Gallery

A responsive photo gallery web app built with **React + Vite + Tailwind CSS** for the Celebrare Frontend Intern Pre-Screening Assignment.

---

## 🚀 Live Demo

> Run locally with `npm run dev` → [http://localhost:5173](http://localhost:5173)

---

## ✨ Features

- **30 Photos** fetched from the [Picsum Photos API](https://picsum.photos/v2/list?limit=30)
- **Loading spinner** while fetching, **error message** if the request fails
- **Responsive grid** — 4 columns (desktop) · 2 columns (tablet) · 1 column (mobile)
- **Real-time search** by photographer name — no API call, no page reload
- **Favourite toggle** with a heart button on every card
- **Favourites persist** across page refreshes via `localStorage`
- **All / Favourites** tab switcher with live counts

---

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev) | UI library |
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [Tailwind CSS v4](https://tailwindcss.com) | Styling (no other UI libraries) |
| [Picsum Photos API](https://picsum.photos) | Free photo data source |

---

## 📁 Project Structure

```
src/
├── App.jsx
├── main.jsx
├── index.css                    # Tailwind + custom utility classes
├── hooks/
│   └── useFetchPhotos.js        # Custom hook — fetch, loading, error
├── reducers/
│   └── favouritesReducer.js     # useReducer — INIT + TOGGLE_FAVOURITE
└── components/
    ├── Gallery.jsx              # Main page (useCallback + useMemo)
    ├── PhotoCard.jsx            # Single photo card with heart toggle
    ├── SearchBar.jsx            # Controlled search input
    ├── LoadingSpinner.jsx       # Loading state UI
    └── ErrorMessage.jsx         # Error state UI
```

---

## ⚙️ Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/azlancodeshere/celebrare-photo-gallery.git
cd celebrare-photo-gallery

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📋 Requirements Checklist

| # | Requirement | Status |
|---|---|---|
| 1 | React + Vite + Tailwind CSS (no other UI libraries) | ✅ |
| 2 | Fetch 30 photos · loading spinner · error message | ✅ |
| 3 | Responsive grid — 4 / 2 / 1 columns | ✅ |
| 4 | Real-time search filter by author name | ✅ |
| 5 | Favourites with `useReducer` + `localStorage` persistence | ✅ |
| 6 | `useFetchPhotos` custom hook returning `{ photos, loading, error }` | ✅ |
| 7 | `useCallback` on search handler · `useMemo` on filtered list | ✅ |

---

## 🧠 Key Implementation Details

### `useFetchPhotos` — Custom Hook
Fetches from `https://picsum.photos/v2/list?limit=30` and returns `{ photos, loading, error }`.  
Uses `AbortController` to cancel in-flight requests on unmount.  
Handles both network errors and non-2xx HTTP responses.

### `favouritesReducer` — useReducer
Manages a `Set` of favourited photo IDs.

| Action | What it does |
|---|---|
| `INIT` | Hydrates the Set from `localStorage` on first render |
| `TOGGLE_FAVOURITE` | Adds the ID if not present, removes it if already saved |

Chosen over `useState` because the update logic is conditional — a pure reducer is easier to reason about and test.

### `useCallback`
Wraps `handleSearchChange` and `handleToggleFavourite` so their references stay stable across re-renders.  
Without this, `SearchBar` and `PhotoCard` (both wrapped in `React.memo`) would re-render on every unrelated state change.

### `useMemo`
Wraps `filteredPhotos` so the `.filter()` over all 30 photos only re-runs when `photos` or `searchQuery` actually changes — not when unrelated state like `favourites` updates.

---

## 🐛 Hardest Part

Images were stuck on the skeleton loading state forever.

**Root cause:** The `<img>` was wrapped in a `display: none` container while loading, which prevented the browser from firing the `onLoad` event.

**Fix:** Always keep the `<img>` in the DOM. Overlay the skeleton with `position: absolute` and use `opacity` transitions — the skeleton fades out and the image fades in once `onLoad` fires.

---

## 📄 License

MIT
