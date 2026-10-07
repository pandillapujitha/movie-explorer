import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import "./index.css";

// HashRouter keeps routing working on GitHub Pages (static hosting, no server rewrites).
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </HashRouter>
  </React.StrictMode>
);
