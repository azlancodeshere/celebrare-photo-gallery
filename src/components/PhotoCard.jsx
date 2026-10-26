import { useState, memo } from 'react';

const PhotoCard = memo(({ photo, isFavourite, onToggle }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [heartAnimating, setHeartAnimating] = useState(false);

  const handleToggle = () => {
    setHeartAnimating(true);
    onToggle(photo.id);
  };

  const imgSrc = `https://picsum.photos/id/${photo.id}/400/300`;

  return (
    <article
      className="photo-card relative group rounded-2xl overflow-hidden bg-slate-800/60 backdrop-blur border border-slate-700/50 shadow-lg"
      aria-label={`Photo by ${photo.author}`}
    >
      <div className="relative w-full aspect-[4/3]">
        <div
          className="skeleton absolute inset-0 transition-opacity duration-500"
          style={{ opacity: imgLoaded ? 0 : 1, pointerEvents: 'none' }}
          aria-hidden="true"
        />

        <img
          src={imgSrc}
          alt={`Photo by ${photo.author}`}
          className="w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: imgLoaded ? 1 : 0 }}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-0.5">
            Photographer
          </p>
          <p className="text-white font-semibold text-sm truncate" title={photo.author}>
            {photo.author}
          </p>
          <p className="text-slate-500 text-xs mt-0.5">
            #{photo.id} · {photo.width}×{photo.height}
          </p>
        </div>

        <button
          id={`fav-btn-${photo.id}`}
          onClick={handleToggle}
          onAnimationEnd={() => setHeartAnimating(false)}
          className={`
            flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full
            transition-all duration-200 cursor-pointer
            ${isFavourite
              ? 'bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 border border-pink-500/40'
              : 'bg-slate-700/60 text-slate-400 hover:bg-slate-600/60 hover:text-pink-400 border border-slate-600/40'
            }
            ${heartAnimating ? 'heart-pop' : ''}
          `}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isFavourite}
        >
          {isFavourite ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          )}
        </button>
      </div>

      {isFavourite && (
        <div className="fav-badge absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-pink-500/90 backdrop-blur text-white text-xs font-semibold shadow-lg shadow-pink-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            Favourite
          </span>
        </div>
      )}
    </article>
  );
});

PhotoCard.displayName = 'PhotoCard';

export default PhotoCard;
