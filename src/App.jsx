import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Favorites from "./pages/Favorites.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>
          Movie data and images from TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </footer>
    </>
  );
}
