import { useCallback, useMemo } from 'react'
import ErrorMessage from './ErrorMessage.jsx'
import PhotoCard from './PhotoCard.jsx'
import Spinner from './Spinner.jsx'
import useFetchPhotos from '../hooks/useFetchPhotos.js'
import useFavourites from '../hooks/useFavourites.js'

// Search input lives at the top of the app and reports every keystroke
// back up to App via onSearch.
export function SearchBar({ onSearch }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <input
        type="text"
        placeholder="Search by author name…"
        onChange={(event) => onSearch(event.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  )
}

export default function Gallery({ query, onSearch }) {
  const { photos, loading, error } = useFetchPhotos()
  const { favourites, toggleFavourite } = useFavourites()

  // useCallback: this function is memoized, so SearchBar does not get a
  // new prop (and does not re-render) unless the identity genuinely changes.
  const handleSearch = useCallback((value) => onSearch(value), [onSearch])

  // useMemo: the filtered list is only recomputed when the fetched photos
  // or the search query change — not on every unrelated re-render.
  const filteredPhotos = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()
    if (!searchTerm) return photos
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm),
    )
  }, [photos, query])

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Photo Gallery</h1>
        <p className="mt-2 text-gray-500">
          Search by author and tap the heart to save your favourites
        </p>
      </header>

      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading && <Spinner />}

      {!loading && error && <ErrorMessage message={error} />}

      {!loading && !error && filteredPhotos.length === 0 && (
        <p className="py-16 text-center text-gray-500">
          No photos match “{query}”.
        </p>
      )}

      {!loading && !error && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggleFavourite={toggleFavourite}
            />
          ))}
        </div>
      )}
    </div>
  )
}
