import { useFavorites } from "../context/FavoritesContext.jsx";

export default function FavoriteButton({ movie, variant = "icon" }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(movie.id);
  const label = saved ? "Remove from watchlist" : "Add to watchlist";

  if (variant === "full") {
    return (
      <button className={`btn ${saved ? "btn--ghost" : ""}`} onClick={() => toggleFavorite(movie)}>
        {saved ? "Remove from watchlist" : "Add to watchlist"}
      </button>
    );
  }
  return (
    <button
      className={`fav ${saved ? "is-saved" : ""}`}
      onClick={() => toggleFavorite(movie)}
      aria-label={label}
      aria-pressed={saved}
      title={label}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"
          fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
