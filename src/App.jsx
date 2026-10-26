import { useState } from 'react'
import Gallery from './components/Gallery.jsx'

export default function App() {
  // The search query is lifted into App because it drives the filtering
  // that happens inside Gallery.
  const [query, setQuery] = useState('')

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Gallery query={query} onSearch={setQuery} />
    </div>
  )
}
