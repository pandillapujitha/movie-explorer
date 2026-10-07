import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage("movie-explorer:favorites", []);

  const value = useMemo(() => {
    const isFavorite = (id) => favorites.some((m) => m.id === id);
    const toggleFavorite = (movie) => {
      const slim = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
      };
      setFavorites((prev) =>
        prev.some((m) => m.id === movie.id) ? prev.filter((m) => m.id !== movie.id) : [slim, ...prev]
      );
    };
    return { favorites, isFavorite, toggleFavorite };
  }, [favorites, setFavorites]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return ctx;
};
