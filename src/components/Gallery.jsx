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
    <div style={{ minHeight: '100vh', background: '#07090f', position: 'relative', zIndex: 1 }}>

      {/* ── Ambient background blobs ─────────────────────────── */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
          width: '70vw', height: '70vw', maxWidth: 900,
          background: 'radial-gradient(ellipse, rgba(109,40,217,0.18) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '-10%',
          width: '50vw', height: '50vw', maxWidth: 600,
          background: 'radial-gradient(ellipse, rgba(219,39,119,0.1) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '-5%',
          width: '40vw', height: '40vw', maxWidth: 500,
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ══════════════════════════════════════════════════════
            HERO HEADER
        ══════════════════════════════════════════════════════ */}
        <header className="fade-up" style={{ textAlign: 'center', paddingTop: 72, paddingBottom: 56 }}>

          {/* Top label */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 99,
              background: 'rgba(124,58,237,0.12)',
              border: '1px solid rgba(124,58,237,0.25)',
              fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
              color: '#a78bfa', textTransform: 'uppercase',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c3aed', boxShadow: '0 0 8px #7c3aed', display: 'inline-block' }} />
              Picsum Photos
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, margin: 0 }}>
            <span style={{ color: '#f8fafc' }}>Discover </span>
            <span className="gradient-text">Beautiful</span>
            <br />
            <span style={{ color: '#f8fafc' }}>Photography</span>
          </h1>

          <p className="fade-up-d1" style={{ marginTop: 20, color: '#475569', fontSize: 16, fontWeight: 400, maxWidth: 480, margin: '20px auto 0' }}>
            Browse 30 curated photos, search by photographer, and save your favourites.
          </p>

          {/* Stats row */}
          {!loading && !error && (
            <div className="fade-up-d2" style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 36 }}>
              {[
                { label: 'Photos', value: photos.length },
                { label: 'Photographers', value: [...new Set(photos.map(p => p.author))].length },
                { label: 'Saved', value: favouriteCount },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: 28, fontWeight: 800, color: '#f8fafc', margin: 0, lineHeight: 1 }}>{value}</p>
                  <p style={{ fontSize: 12, color: '#475569', fontWeight: 500, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* ══════════════════════════════════════════════════════
            CONTROLS BAR (Search + Tabs)
        ══════════════════════════════════════════════════════ */}
        {!loading && !error && (
          <div className="fade-up-d3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, marginBottom: 48 }}>

            {/* Search */}
            <SearchBar
              value={searchQuery}
              onChange={handleSearchChange}
              totalCount={photos.length}
              filteredCount={filteredPhotos.length}
            />

            {/* Tabs */}
            <div style={{
              display: 'inline-flex', gap: 6, padding: 6, borderRadius: 16,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              {/* All tab */}
              <button
                id="tab-all"
                onClick={() => setActiveTab('all')}
                className="cursor-pointer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 18px', borderRadius: 10, border: 'none',
                  fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
                  background: activeTab === 'all'
                    ? 'linear-gradient(135deg,#7c3aed,#6d28d9)'
                    : 'transparent',
                  color: activeTab === 'all' ? '#fff' : '#64748b',
                  boxShadow: activeTab === 'all' ? '0 4px 16px rgba(124,58,237,0.4)' : 'none',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" style={{ width: 15, height: 15 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
                All Photos
                <span style={{
                  padding: '1px 7px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                  background: activeTab === 'all' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)',
                  color: activeTab === 'all' ? '#fff' : '#64748b',
                }}>
                  {photos.length}
                </span>
              </button>

              {/* Favourites tab */}
              <button
                id="tab-favourites"
                onClick={() => setActiveTab('favourites')}
                className="cursor-pointer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 18px', borderRadius: 10, border: 'none',
                  fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
                  background: activeTab === 'favourites'
                    ? 'linear-gradient(135deg,#db2777,#be185d)'
                    : 'transparent',
                  color: activeTab === 'favourites' ? '#fff' : '#64748b',
                  boxShadow: activeTab === 'favourites' ? '0 4px 16px rgba(219,39,119,0.4)' : 'none',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: 15, height: 15 }}>
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                Favourites
                {favouriteCount > 0 && (
                  <span style={{
                    padding: '1px 7px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                    background: activeTab === 'favourites' ? 'rgba(255,255,255,0.2)' : 'rgba(219,39,119,0.15)',
                    color: activeTab === 'favourites' ? '#fff' : '#f472b6',
                  }}>
                    {favouriteCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            STATES: Loading / Error / Empty
        ══════════════════════════════════════════════════════ */}
        {loading && <LoadingSpinner />}
        {!loading && error && <ErrorMessage message={error} onRetry={() => window.location.reload()} />}

        {/* Empty favourites */}
        {!loading && !error && activeTab === 'favourites' && displayedPhotos.length === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', gap: 20 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(219,39,119,0.08)', border: '1px solid rgba(219,39,119,0.2)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f472b6" style={{ width: 32, height: 32 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#f8fafc', fontWeight: 700, fontSize: 18, margin: 0 }}>No favourites yet</p>
              <p style={{ color: '#475569', fontSize: 14, marginTop: 6 }}>Click the ♥ on any photo to save it here</p>
            </div>
          </div>
        )}

        {/* No search results */}
        {!loading && !error && activeTab === 'all' && displayedPhotos.length === 0 && searchQuery && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', gap: 16 }}>
            <p style={{ color: '#f8fafc', fontWeight: 700, fontSize: 18 }}>No results for "{searchQuery}"</p>
            <p style={{ color: '#475569', fontSize: 14 }}>Try a different photographer name</p>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            PHOTO GRID
        ══════════════════════════════════════════════════════ */}
        {!loading && !error && displayedPhotos.length > 0 && (
          <>
            {/* Result meta row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <p style={{ color: '#334155', fontSize: 13, fontWeight: 500 }}>
                {searchQuery
                  ? `${displayedPhotos.length} result${displayedPhotos.length !== 1 ? 's' : ''}`
                  : activeTab === 'favourites'
                    ? `${displayedPhotos.length} saved`
                    : `${displayedPhotos.length} photos`
                }
              </p>
              {favouriteCount > 0 && activeTab === 'all' && (
                <p style={{ color: '#f472b6', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: 13, height: 13 }}>
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  {favouriteCount} saved
                </p>
              )}
            </div>

            {/*
              Responsive grid:
              - Mobile  : 1 column
              - Tablet  : 2 columns  (sm: 640px)
              - Desktop : 4 columns  (lg: 1024px)
            */}
            <main>
              <div
                id="photo-grid"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              >
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

        {/* ── Footer ── */}
        {!loading && !error && (
          <footer style={{ textAlign: 'center', marginTop: 80 }}>
            <p style={{ color: '#1e293b', fontSize: 12 }}>
              Photos from{' '}
              <a href="https://picsum.photos" target="_blank" rel="noopener noreferrer"
                style={{ color: '#334155', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#64748b'}
                onMouseLeave={e => e.target.style.color = '#334155'}
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
