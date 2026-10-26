import { useReducer, useEffect, useState, useCallback, useMemo } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import { favouritesReducer, initialFavouritesState } from '../reducers/favouritesReducer';
import PhotoCard from './PhotoCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const STORAGE_KEY = 'photo_gallery_favourites';

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos(30);

  const [favourites, dispatch] = useReducer(favouritesReducer, initialFavouritesState);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(stored) && stored.length > 0) {
        dispatch({ type: 'INIT', payload: stored });
      }
    } catch {
      // corrupted storage — start fresh
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...favourites]));
    } catch {
      // storage quota exceeded — fail silently
    }
  }, [favourites]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: id });
  }, []);

  const filteredPhotos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return photos;
    return photos.filter((p) => p.author.toLowerCase().includes(q));
  }, [photos, searchQuery]);

  const displayedPhotos = useMemo(() => {
    if (activeTab === 'favourites') {
      return filteredPhotos.filter((p) => favourites.has(p.id));
    }
    return filteredPhotos;
  }, [filteredPhotos, activeTab, favourites]);

  const favouriteCount = favourites.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-pink-600/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-indigo-600/8 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-600 shadow-lg shadow-violet-500/30 mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Photo{' '}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <p className="text-slate-400 mt-3 text-base">
            Browse stunning photos from{' '}
            <a
              href="https://picsum.photos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
            >
              Picsum Photos
            </a>
          </p>
        </header>

        {!loading && !error && (
          <div className="mb-8">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              totalCount={photos.length}
              filteredCount={filteredPhotos.length}
            />
          </div>
        )}

        {!loading && !error && (
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              id="tab-all"
              onClick={() => setActiveTab('all')}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                transition-all duration-200 cursor-pointer
                ${activeTab === 'all'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                  : 'bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-700/70 border border-slate-700/50'
                }
              `}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
              All Photos
              <span className="px-1.5 py-0.5 rounded-md bg-white/20 text-xs">{photos.length}</span>
            </button>

            <button
              id="tab-favourites"
              onClick={() => setActiveTab('favourites')}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
                transition-all duration-200 cursor-pointer
                ${activeTab === 'favourites'
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-700/70 border border-slate-700/50'
                }
              `}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              Favourites
              {favouriteCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-md bg-white/20 text-xs">{favouriteCount}</span>
              )}
            </button>
          </div>
        )}

        {loading && <LoadingSpinner />}

        {!loading && error && (
          <ErrorMessage
            message={error}
            onRetry={() => window.location.reload()}
          />
        )}

        {!loading && !error && activeTab === 'favourites' && displayedPhotos.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
            <div className="w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-pink-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-lg">No favourites yet</p>
              <p className="text-slate-500 text-sm mt-1">Click the ♥ button on any photo to save it here</p>
            </div>
          </div>
        )}

        {!loading && !error && activeTab === 'all' && displayedPhotos.length === 0 && searchQuery && (
          <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-700/60 border border-slate-600/40 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-white font-semibold text-lg">No results found</p>
              <p className="text-slate-500 text-sm mt-1">
                No photographer named &quot;<span className="text-violet-400">{searchQuery}</span>&quot;
              </p>
            </div>
          </div>
        )}

        {!loading && !error && displayedPhotos.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="text-slate-500 text-sm">
                {activeTab === 'favourites'
                  ? `${displayedPhotos.length} favourited photo${displayedPhotos.length !== 1 ? 's' : ''}`
                  : searchQuery
                    ? `${displayedPhotos.length} result${displayedPhotos.length !== 1 ? 's' : ''} for "${searchQuery}"`
                    : `${displayedPhotos.length} photos`
                }
              </p>
              {favouriteCount > 0 && activeTab === 'all' && (
                <p className="text-pink-400 text-sm font-medium">♥ {favouriteCount} favourited</p>
              )}
            </div>

            <main>
              <div
                id="photo-grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                aria-label="Photo gallery grid"
              >
                {displayedPhotos.map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    isFavourite={favourites.has(photo.id)}
                    onToggle={handleToggleFavourite}
                  />
                ))}
              </div>
            </main>
          </>
        )}

        {!loading && !error && (
          <footer className="text-center mt-16 pb-6">
            <p className="text-slate-600 text-xs">
              Photos courtesy of{' '}
              <a
                href="https://picsum.photos"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-400 transition-colors"
              >
                picsum.photos
              </a>
              {' '}· Built with React + Vite + Tailwind CSS
            </p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Gallery;
