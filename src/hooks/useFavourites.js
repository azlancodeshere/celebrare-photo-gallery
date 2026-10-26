import { useEffect, useReducer } from 'react'

const STORAGE_KEY = 'favouritePhotos'

// The reducer owns the favourites state. Each state change is an explicit
// action, which makes the toggle logic predictable and easy to trace.
function favouritesReducer(state, action) {
  switch (action.type) {
    case 'toggle': {
      const isFavourite = state.includes(action.id)
      return isFavourite
        ? state.filter((id) => id !== action.id)
        : [...state, action.id]
    }
    default:
      return state
  }
}

// Read persisted favourites once when the app starts.
function init() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// Custom hook wrapping useReducer + localStorage persistence.
export default function useFavourites() {
  const [favourites, dispatch] = useReducer(favouritesReducer, undefined, init)

  // Persist on every change so favourites survive a page refresh.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
  }, [favourites])

  const toggleFavourite = (id) => dispatch({ type: 'toggle', id })

  return { favourites, toggleFavourite }
}
