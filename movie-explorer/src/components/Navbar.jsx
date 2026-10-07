import { NavLink, Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext.jsx";

export default function Navbar() {
  const { favorites } = useFavorites();
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="brand">
          Movie<span>Explorer</span>
        </Link>
        <nav aria-label="Main">
          <NavLink to="/" end className="navlink">Discover</NavLink>
          <NavLink to="/favorites" className="navlink">
            Watchlist
            {favorites.length > 0 && <span className="count">{favorites.length}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
