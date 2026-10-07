const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const imageUrl = (path, size = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export const CATEGORIES = [
  { id: "popular", label: "Popular" },
  { id: "top_rated", label: "Top rated" },
  { id: "now_playing", label: "Now playing" },
  { id: "upcoming", label: "Upcoming" },
];

/* Telugu Movies category */
export const TELUGU_CATEGORY = {
  id: "telugu",
  label: "Telugu Movies",
};

/** Central fetch helper */
async function request(path, params = {}, signal) {
  if (!API_KEY || API_KEY === "your_tmdb_api_key_here") {
    throw new Error(
      "Missing TMDB API key. Add VITE_TMDB_API_KEY to your .env file and restart the dev server."
    );
  }

  const query = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
    ...params,
  });

  let res;

  try {
    res = await fetch(`${BASE_URL}${path}?${query}`, { signal });
  } catch (err) {
    if (err.name === "AbortError") throw err;

    throw new Error(
      "Network error. Check your internet connection and try again."
    );
  }

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error(
        "TMDB rejected the API key. Check that it is correct."
      );
    }

    if (res.status === 404) {
      throw new Error("We couldn't find that movie.");
    }

    if (res.status === 429) {
      throw new Error(
        "Too many requests. Wait a moment and try again."
      );
    }

    throw new Error(
      `TMDB returned an error (${res.status}). Try again later.`
    );
  }

  return res.json();
}

/**
 * Get movies from TMDB.
 *
 * Supports:
 * - Search
 * - Genre
 * - Telugu movies
 * - Popular
 * - Top rated
 * - Now playing
 * - Upcoming
 */
export function getMovies(
  {
    query,
    category = "popular",
    genre,
    page = 1,
  },
  signal
) {
  // Search movies
  if (query) {
    return request(
      "/search/movie",
      {
        query,
        page,
        include_adult: false,
      },
      signal
    );
  }

  // Telugu movies
  if (category === "telugu") {
    return request(
      "/discover/movie",
      {
        with_original_language: "te",
        page,
        sort_by: "popularity.desc",
        include_adult: false,
      },
      signal
    );
  }

  // Genre filter
  if (genre) {
    return request(
      "/discover/movie",
      {
        with_genres: genre,
        page,
        sort_by: "popularity.desc",
        include_adult: false,
      },
      signal
    );
  }

  // Normal categories
  return request(
    `/movie/${category}`,
    {
      page,
    },
    signal
  );
}

export const getGenres = (signal) =>
  request("/genre/movie/list", {}, signal);

export const getMovieDetails = (id, signal) =>
  request(
    `/movie/${id}`,
    {
      append_to_response: "credits,videos,similar",
    },
    signal
  );