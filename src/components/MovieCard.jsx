import { Link } from "react-router-dom";
import { imageUrl } from "../api/tmdb.js";
import RatingBadge from "./RatingBadge.jsx";
import FavoriteButton from "./FavoriteButton.jsx";

export default function MovieCard({ movie }) {
  const poster = imageUrl(movie.poster_path, "w342");
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "Unreleased";

  return (
    <article className="card">
      <Link to={`/movie/${movie.id}`} className="card__link">
        <div className="card__poster">
          {poster ? (
            <img src={poster} alt={`${movie.title} poster`} loading="lazy" />
          ) : (
            <div className="card__noimg">No poster available</div>
          )}
          <RatingBadge value={movie.vote_average} />
        </div>
        <div className="card__body">
          <h3>{movie.title}</h3>
          <p>{year}</p>
        </div>
      </Link>
      <FavoriteButton movie={movie} />
    </article>
  );
}
