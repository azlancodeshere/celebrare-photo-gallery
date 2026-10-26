import { useEffect, useState } from 'react'

// Custom hook: fetches 30 photos from the Picsum Photos API on mount.
// Returns { photos, loading, error } so the Gallery component stays
// focused on rendering while this hook owns all the data logic.
export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        const response = await fetch('https://picsum.photos/v2/list?limit=30', {
          signal: controller.signal,
        })

        if (!response.ok) {
          // e.g. 404 / 500 — turn HTTP failures into a real thrown error
          throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json()
        setPhotos(data)
        setError(null)
      } catch (err) {
        // Ignore the abort that happens when the component unmounts
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong while fetching photos.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()

    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}
