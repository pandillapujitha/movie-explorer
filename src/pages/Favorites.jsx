import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";
import MovieGrid from "../components/MovieGrid.jsx";

export default function Favorites() {
  const { favorites } = useFavorites();
  return (
    <>
      <h1 className="page-title">Your watchlist</h1>
      {favorites.length === 0 ? (
        <div className="state">
          <h2>Your watchlist is empty</h2>
          <p>Use the bookmark on any movie to save it here.</p>
          <Link className="btn" to="/">Discover movies</Link>
        </div>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </>
  );
}
