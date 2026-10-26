export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <img
        src={`https://picsum.photos/id/${photo.id}/600/400`}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="aspect-[3/2] w-full object-cover"
      />
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <p className="truncate text-sm font-medium text-gray-800">
          {photo.author}
        </p>
        <button
          type="button"
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={
            isFavourite ? 'Remove from favourites' : 'Add to favourites'
          }
          aria-pressed={isFavourite}
          className="shrink-0 text-xl transition-transform hover:scale-110"
        >
          {isFavourite ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  )
}
