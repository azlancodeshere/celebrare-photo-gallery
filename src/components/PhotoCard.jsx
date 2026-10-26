import { useState, memo } from 'react';

const HeartFilled = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

const HeartOutline = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const PhotoCard = memo(({ photo, isFavourite, onToggle, priority }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [heartAnimating, setHeartAnimating] = useState(false);

  const handleToggle = () => {
    setHeartAnimating(true);
    onToggle(photo.id);
  };

  const avatarColorIndex = (photo.author.charCodeAt(0) * 37) % 12;

  return (
    <article
      className="photo-card glass-card relative rounded-2xl overflow-hidden group"
      aria-label={`Photo by ${photo.author}`}
    >
      <div className="relative w-full overflow-hidden aspect-3/2">
        <div
          className={`skeleton absolute inset-0 z-10 transition-opacity duration-700 ${imgLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          aria-hidden="true"
        />

        <img
          src={`https://picsum.photos/id/${photo.id}/600/400`}
          alt={`Photo by ${photo.author}`}
          width={600}
          height={400}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'low'}
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgLoaded(true)}
          className={`img-reveal w-full h-full object-cover transition-all duration-500 ${imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
        />

        <div className="img-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" aria-hidden="true" />

        {isFavourite && (
          <div className="badge-in absolute top-3 left-3 z-30">
            <span className="badge-saved">
              <HeartFilled />
              Saved
            </span>
          </div>
        )}

        <button
          id={`fav-btn-${photo.id}`}
          onClick={handleToggle}
          onAnimationEnd={() => setHeartAnimating(false)}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isFavourite}
          className={[
            'absolute top-3 right-3 z-30',
            'w-9 h-9 rounded-full flex items-center justify-center cursor-pointer',
            'transition-all duration-200',
            isFavourite ? 'heart-overlay-on text-pink-400' : 'heart-overlay-off text-white/70 hover:text-pink-400 opacity-0 group-hover:opacity-100',
            heartAnimating ? 'heart-pop' : '',
          ].join(' ')}
        >
          {isFavourite ? <HeartFilled /> : <HeartOutline />}
        </button>
      </div>

      <div className="px-4 py-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div
            className={`avatar-color-${avatarColorIndex} shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white`}
            aria-hidden="true"
          >
            {photo.author.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-50 text-sm font-semibold truncate" title={photo.author}>
              {photo.author}
            </p>
            <p className="text-slate-600 text-xs">
              {photo.width} × {photo.height}
            </p>
          </div>
        </div>

        <button
          onClick={handleToggle}
          onAnimationEnd={() => setHeartAnimating(false)}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isFavourite}
          className={[
            'sm:hidden shrink-0 w-8 h-8 rounded-full',
            'flex items-center justify-center cursor-pointer transition-all duration-200',
            isFavourite ? 'heart-footer-on text-pink-400' : 'heart-footer-off text-slate-500',
            heartAnimating ? 'heart-pop' : '',
          ].join(' ')}
        >
          {isFavourite ? <HeartFilled /> : <HeartOutline />}
        </button>
      </div>
    </article>
  );
});

PhotoCard.displayName = 'PhotoCard';
export default PhotoCard;
