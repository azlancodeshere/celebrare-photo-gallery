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
      console.error('Failed to load favourites from localStorage');
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...favourites]));
    } catch {
      console.error('Failed to save favourites to localStorage');
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
    if (activeTab === 'favourites') return filteredPhotos.filter((p) => favourites.has(p.id));
    return filteredPhotos;
  }, [filteredPhotos, activeTab, favourites]);

  const favouriteCount = favourites.size;

  return (
    <div className="relative min-h-screen bg-[#07090f] z-1">

      <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-top" />
        <div className="blob blob-right" />
        <div className="blob blob-left" />
      </div>

      <div className="relative z-1 max-w-350px mx-auto px-6 pb-20">

        <header className="fade-up text-center pt-16 pb-14">
          <div className="flex justify-center mb-6">
            <span className="hero-label">
              <span className="hero-dot" />
              Picsum Photos
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight text-slate-50 tracking-tight">
            Discover{' '}
            <span className="gradient-text">Beautiful</span>
            <br />Photography
          </h1>

          <p className="fade-up-d1 mt-5 text-slate-600 text-base max-w-md mx-auto">
            Browse 30 curated photos, search by photographer, and save your favourites.
          </p>

          {!loading && !error && (
            <div className="fade-up-d2 flex justify-center gap-10 mt-10">
              {[
                { label: 'Photos', value: photos.length },
                { label: 'Photographers', value: [...new Set(photos.map(p => p.author))].length },
                { label: 'Saved', value: favouriteCount },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-3xl font-extrabold text-slate-50 leading-none">{value}</p>
                  <p className="text-xs text-slate-600 font-medium mt-1 uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>
          )}
        </header>

        {!loading && !error && (
          <div className="fade-up-d3 flex flex-col items-center gap-4 mb-12">
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              totalCount={photos.length}
              filteredCount={filteredPhotos.length}
            />

            <div className="glass-surface inline-flex gap-1.5 p-1.5 rounded-2xl">
              <button
                id="tab-all"
                onClick={() => setActiveTab('all')}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer border-none outline-none ${activeTab === 'all' ? 'btn-violet text-white' : 'bg-transparent text-slate-500 hover:text-slate-300'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                All Photos
                <span className={`tab-count ${activeTab === 'all' ? 'tab-count-on' : 'tab-count-off'}`}>
                  {photos.length}
                </span>
              </button>

              <button
                id="tab-favourites"
                onClick={() => setActiveTab('favourites')}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer border-none outline-none ${activeTab === 'favourites' ? 'btn-pink text-white' : 'bg-transparent text-slate-500 hover:text-slate-300'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                Favourites
                {favouriteCount > 0 && (
                  <span className={`tab-count ${activeTab === 'favourites' ? 'tab-count-on' : 'tab-count-fav'}`}>
                    {favouriteCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {loading && <LoadingSpinner />}

        {!loading && error && (
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        )}

        {!loading && !error && activeTab === 'favourites' && displayedPhotos.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-5 min-h-[40vh]">
            <div className="w-16 h-16 rounded-full flex items-center justify-center error-icon-bg" style={{ background: 'rgba(219,39,119,0.08)', border: '1px solid rgba(219,39,119,0.2)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f472b6" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-slate-50 font-bold text-lg">No favourites yet</p>
              <p className="text-slate-600 text-sm mt-1">Click the ♥ on any photo to save it here</p>
            </div>
          </div>
        )}

        {!loading && !error && activeTab === 'all' && displayedPhotos.length === 0 && searchQuery && (
          <div className="flex flex-col items-center justify-center gap-4 min-h-[40vh]">
            <p className="text-slate-50 font-bold text-lg">No results for &quot;{searchQuery}&quot;</p>
            <p className="text-slate-600 text-sm">Try a different photographer name</p>
          </div>
        )}

        {!loading && !error && displayedPhotos.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-slate-700 text-sm font-medium">
                {searchQuery
                  ? `${displayedPhotos.length} result${displayedPhotos.length !== 1 ? 's' : ''}`
                  : activeTab === 'favourites'
                    ? `${displayedPhotos.length} saved`
                    : `${displayedPhotos.length} photos`}
              </p>
              {favouriteCount > 0 && activeTab === 'all' && (
                <p className="text-pink-400 text-sm font-semibold flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  {favouriteCount} saved
                </p>
              )}
            </div>

            <main>
              <div id="photo-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {displayedPhotos.map((photo, index) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    isFavourite={favourites.has(photo.id)}
                    onToggle={handleToggleFavourite}
                    priority={index < 4}
                  />
                ))}
              </div>
            </main>
          </>
        )}

        {!loading && !error && (
          <footer className="text-center mt-20">
            <p className="text-slate-800 text-xs">
              Photos from{' '}
              <a href="https://picsum.photos" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">
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
