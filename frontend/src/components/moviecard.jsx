import { useState } from 'react'

function MovieCard({ movie, onDelete }) {
  const [liked, setLiked] = useState(false)

  return (
    <div className="relative aspect-[2/3] overflow-hidden rounded-3xl bg-neutral-800">
      {movie.poster ? (
        <img
          src={movie.poster}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center p-4 text-center text-lg">
          {movie.title}
        </div>
      )}

      <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-sm">
        <span className="text-yellow-400">★</span>
        {movie.rating != null && <span>{movie.rating}</span>}
      </div>

      <div className="absolute bottom-3 right-3 flex gap-2">
        <button
          type="button"
          onClick={() => setLiked(!liked)}
          aria-label={liked ? `Unfavorite ${movie.title}` : `Favorite ${movie.title}`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/70"
        >
          {liked ? <span className="text-red-500">♥</span> : '♡'}
        </button>
        <button
          type="button"
          onClick={() => onDelete(movie._id)}
          aria-label={`Remove ${movie.title} from watchlist`}
          title="Remove from watchlist"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-red-600"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default MovieCard