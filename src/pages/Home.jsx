import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovies, getGenres, CATEGORIES, TELUGU_CATEGORY } from "../api/tmdb.js";
import useFetch from "../hooks/useFetch.js";
import useDebounce from "../hooks/useDebounce.js";
import SearchBar from "../components/SearchBar.jsx";
import CategoryNav from "../components/CategoryNav.jsx";
import MovieGrid from "../components/MovieGrid.jsx";
import Pagination from "../components/Pagination.jsx";
import { GridSkeleton } from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function Home() {
  // Filters live in the URL, so any search or filter can be shared or bookmarked.
  const [params, setParams] = useSearchParams();

  const query = params.get("q") || "";
  const category = params.get("category") || "popular";
  const genre = params.get("genre") || "";
  const page = Number(params.get("page")) || 1;

  const [text, setText] = useState(query);
  const debouncedText = useDebounce(text.trim(), 500);

  const update = (changes) => {
    const next = new URLSearchParams(params);

    Object.entries(changes).forEach(([k, v]) =>
      v ? next.set(k, v) : next.delete(k)
    );

    setParams(next);
  };

  // Push the debounced search text into the URL.
  useEffect(() => {
    if (debouncedText !== query) {
      update({
        q: debouncedText,
        page: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedText]);

  // Keep the input in sync when the URL changes.
  useEffect(() => {
    setText(query);
  }, [query]);

  const { data: genreData } = useFetch(
    (signal) => getGenres(signal),
    []
  );

  const { data, loading, error, retry } = useFetch(
    (signal) =>
      getMovies(
        {
          query,
          category,
          genre,
          page,
        },
        signal
      ),
    [query, category, genre, page]
  );

  const genres = genreData?.genres || [];
  const movies = data?.results || [];

  const activeGenre = genres.find(
    (g) => String(g.id) === genre
  );

  // Heading for the current movie selection
  let heading = "Popular movies";

  if (query) {
    heading = `Results for "${query}"`;
  } else if (activeGenre) {
    heading = `${activeGenre.name} movies`;
  } else if (category === TELUGU_CATEGORY.id) {
    heading = "Telugu Movies";
  } else {
    heading =
      `${CATEGORIES.find((c) => c.id === category)?.label || "Popular"} movies`;
  }

  return (
    <>
      <section className="hero">
        <h1>Find your next movie night.</h1>

        <p>
          Search thousands of films, check their ratings and read the details
          before you press play.
        </p>

        <SearchBar
          value={text}
          onChange={setText}
        />
      </section>

      <CategoryNav
        category={category}
        genre={genre}
        genres={genres}
        disabled={!!query}
        onCategory={(c) =>
          update({
            category: c === "popular" ? "" : c,
            genre: "",
            q: "",
            page: "",
          })
        }
        onGenre={(g) =>
          update({
            genre: g,
            q: "",
            page: "",
          })
        }
      />

      <h2 className="section-title">{heading}</h2>

      {loading && <GridSkeleton />}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={retry}
        />
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="state">
          <h2>No movies found</h2>
          <p>
            Check the spelling or try a different title.
          </p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} />

          <Pagination
            page={page}
            totalPages={data.total_pages}
            onChange={(p) => {
              update({
                page: p === 1 ? "" : String(p),
              });

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />
        </>
      )}
    </>
  );
}