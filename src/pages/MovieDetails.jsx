import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails, imageUrl } from "../api/tmdb.js";
import useFetch from "../hooks/useFetch.js";
import RatingBadge from "../components/RatingBadge.jsx";
import FavoriteButton from "../components/FavoriteButton.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import { Spinner } from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

const formatRuntime = (min) => (min ? `${Math.floor(min / 60)}h ${min % 60}m` : null);
const formatMoney = (n) => (n ? `$${n.toLocaleString()}` : "Not reported");

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movie, loading, error, retry } = useFetch((s) => getMovieDetails(id, s), [id]);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    setShowTrailer(false);
    window.scrollTo({ top: 0 });
  }, [id]);

  useEffect(() => {
    if (movie) document.title = `${movie.title} | Movie Explorer`;
    return () => { document.title = "Movie Explorer"; };
  }, [movie]);

  const back = (
    <button className="back" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}>
      Back to movies
    </button>
  );

  if (loading) return <>{back}<Spinner label="Loading movie details" /></>;
  if (error) return <>{back}<ErrorMessage message={error} onRetry={retry} /></>;

  const trailer = movie.videos?.results?.find((v) => v.site === "YouTube" && v.type === "Trailer");
  const cast = movie.credits?.cast?.slice(0, 10) || [];
  const director = movie.credits?.crew?.find((c) => c.job === "Director");
  const similar = movie.similar?.results?.slice(0, 6) || [];
  const backdrop = imageUrl(movie.backdrop_path, "w1280");
  const poster = imageUrl(movie.poster_path, "w500");
  const year = movie.release_date?.slice(0, 4);

  return (
    <article className="details">
      {back}

      <section className="details__hero" style={backdrop ? { "--backdrop": `url(${backdrop})` } : undefined}>
        <div className="details__poster">
          {poster ? <img src={poster} alt={`${movie.title} poster`} /> : <div className="card__noimg">No poster available</div>}
        </div>

        <div className="details__info">
          <h1>{movie.title} {year && <small>({year})</small>}</h1>
          {movie.tagline && <p className="tagline">{movie.tagline}</p>}

          <div className="meta">
            <RatingBadge value={movie.vote_average} votes={movie.vote_count} size="lg" />
            <p>
              {[movie.release_date, formatRuntime(movie.runtime), movie.original_language?.toUpperCase()]
                .filter(Boolean).join(" / ")}
              {movie.vote_count > 0 && <><br />{movie.vote_count.toLocaleString()} votes</>}
            </p>
          </div>

          <ul className="chips" aria-label="Genres">
            {movie.genres.map((g) => <li key={g.id}>{g.name}</li>)}
          </ul>

          <h2>Overview</h2>
          <p className="overview">{movie.overview || "No overview is available for this movie yet."}</p>

          <div className="actions">
            <FavoriteButton movie={movie} variant="full" />
            {trailer && (
              <button className="btn btn--ghost" onClick={() => setShowTrailer((s) => !s)}>
                {showTrailer ? "Hide trailer" : "Watch trailer"}
              </button>
            )}
          </div>
        </div>
      </section>

      {showTrailer && trailer && (
        <div className="trailer">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1`}
            title={`${movie.title} trailer`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <dl className="facts">
        <div><dt>Director</dt><dd>{director?.name || "Unknown"}</dd></div>
        <div><dt>Status</dt><dd>{movie.status}</dd></div>
        <div><dt>Budget</dt><dd>{formatMoney(movie.budget)}</dd></div>
        <div><dt>Revenue</dt><dd>{formatMoney(movie.revenue)}</dd></div>
      </dl>

      {cast.length > 0 && (
        <section>
          <h2 className="section-title">Top cast</h2>
          <ul className="cast">
            {cast.map((p) => (
              <li key={p.credit_id}>
                {p.profile_path ? <img src={imageUrl(p.profile_path, "w185")} alt="" loading="lazy" /> : <div className="cast__noimg" />}
                <strong>{p.name}</strong>
                <span>{p.character}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {similar.length > 0 && (
        <section>
          <h2 className="section-title">More like this</h2>
          <MovieGrid movies={similar} />
        </section>
      )}
    </article>
  );
}
