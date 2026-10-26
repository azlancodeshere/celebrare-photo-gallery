# Photo Gallery — Celebrare Frontend Intern Assignment

A React + Vite + Tailwind CSS photo gallery that fetches 30 photos from the
[Picsum Photos API](https://picsum.photos/v2/list?limit=30), filters them by
author in real time, and lets you favourite photos (persisted in localStorage).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
```

## How the requirements map to the code

| # | Requirement | Where |
|---|-------------|-------|
| 1 | React + Vite + Tailwind only | `vite.config.js` (Tailwind v4 plugin), `src/index.css` |
| 2 | Fetch 30 photos, loading + error states | `src/hooks/useFetchPhotos.js` → spinner / error UI in `Gallery.jsx` |
| 3 | Responsive grid: 4 / 2 / 1 columns | `Gallery.jsx` — `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` |
| 4 | Real-time search by author, no API call | `App.jsx` holds `query`, `Gallery.jsx` filters already-fetched data |
| 5 | Favourites via `useReducer` + localStorage | `src/hooks/useFavourites.js` |
| 6 | Custom hook `useFetchPhotos` returning `photos, loading, error` | `Gallery.jsx` consumes the hook, never fetches directly |
| 7 | `useCallback` + `useMemo` | `Gallery.jsx` — `handleSearch` / `filteredPhotos` |

## 5-minute recording talking points

1. **App working** — photos load with a spinner, search filters live, a heart
   toggles and survives a page refresh (localStorage).
2. **`useFetchPhotos`** — returns `{ photos, loading, error }`. On failure the
   `catch` sets `error`, the `finally` clears `loading`, and the UI swaps the
   grid for an error message. An `AbortController` cancels the request if the
   component unmounts mid-fetch.
3. **`useReducer`** — the reducer handles one action, `toggle`: if the id is in
   the favourites array it removes it, otherwise it appends it. I used a reducer
   instead of `useState` because every state change is an explicit action that's
   easy to trace and extend (e.g. a future `clear` action), and the persistence
   effect keys off the whole state array.
4. **`useCallback` / `useMemo`** — `handleSearch` is memoized so `SearchBar`
   gets a stable prop and doesn't re-render unnecessarily; `filteredPhotos` is
   memoized so the filter loop only re-runs when `photos` or `query` actually
   change. Remove them and the app still works — but every re-render recomputes
   the 30-item filter and passes a new function down, which would matter with a
   much larger list or more expensive filtering.
5. **Hardest part** — deciding where state lives: the search query had to be
   lifted into `App` because typing happens in the search bar but filtering
   happens in `Gallery`, and the abort handling in the fetch hook so React
   StrictMode's double-mount doesn't log spurious errors.
