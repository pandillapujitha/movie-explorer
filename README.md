# Movie Explorer

## 🚀 Live Demo

[**Movie Explorer – Live Demo**](https://movie-explorer-puji.netlify.app/)

A responsive movie discovery app built with **React 18**, **React Router** and the **TMDB API**. Search for any film, browse categories, filter by genre, check ratings and open a detailed page with cast, trailer and similar movies. It runs entirely in the browser, with no backend.

**Live demo:** `https://<your-username>.github.io/<your-repo>/`

## Features

| Assignment requirement | How the app delivers it |
| --- | --- |
| Search movies using a public API | Debounced search bar calling TMDB `/search/movie`, with the query kept in the URL |
| View detailed movie information | `/movie/:id` page with overview, runtime, genres, cast, director, budget, revenue, trailer and similar movies |
| Display movie ratings | Color-coded circular rating badge on every card and a large version with vote count on the details page |
| Category filters | Popular, Top rated, Now playing and Upcoming tabs, plus a genre dropdown (`/discover/movie`) |
| Responsive design | CSS Grid with auto-fill columns, a stacked layout under 760px, horizontal scrolling tabs and cast list |
| Loading indicators | Skeleton cards for lists and a spinner for the details page |
| Proper error handling | Missing key, invalid key, network, rate limit and 404 errors show a clear message with a "Try again" button; empty results and unknown routes have their own screens |

Extras: a persistent watchlist (localStorage), pagination, a trailer player, shareable URLs, keyboard focus styles and reduced-motion support.

## Skills demonstrated

- **React components and reusable components:** `MovieCard`, `MovieGrid`, `RatingBadge`, `SearchBar`, `CategoryNav`, `Pagination`, `ErrorMessage`, `GridSkeleton` and `Spinner` are shared across pages.
- **React Hooks:** `useState`, `useEffect`, `useMemo`, `useCallback`, `useContext` and three custom hooks (`useFetch`, `useDebounce`, `useLocalStorage`).
- **API integration:** `src/api/tmdb.js` wraps `fetch`, adds the key, handles HTTP errors and supports request cancellation with `AbortController`.
- **State management:** local state for UI, URL search params for filters and pagination, and Context API for the global watchlist.
- **Routing:** React Router v6 with `/`, `/movie/:id`, `/favorites` and a catch-all 404 route.

## Folder structure

```
movie-explorer/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── .gitignore
└── src/
    ├── main.jsx                 # entry point, router and providers
    ├── App.jsx                  # layout and routes
    ├── index.css                # global styles and design tokens
    ├── api/
    │   └── tmdb.js              # all TMDB requests
    ├── hooks/
    │   ├── useFetch.js          # loading / error / data with cancellation
    │   ├── useDebounce.js
    │   └── useLocalStorage.js
    ├── context/
    │   └── FavoritesContext.jsx # watchlist state
    ├── components/              # reusable UI pieces
    └── pages/
        ├── Home.jsx
        ├── MovieDetails.jsx
        ├── Favorites.jsx
        └── NotFound.jsx
```

## API setup

1. Create a free account at [themoviedb.org](https://www.themoviedb.org/signup).
2. Open **Settings > API** and request a developer API key.
3. Copy the **API Key (v3 auth)** value.
4. Copy `.env.example` to `.env` and paste the key:

   ```
   VITE_TMDB_API_KEY=your_key_here
   ```

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173). Restart the dev server after changing `.env`.

## Deploy to GitHub Pages

The app uses `HashRouter` and a relative Vite `base`, so it works on GitHub Pages under any repository name.

1. Create an empty repository on GitHub, then push the project:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Movie Explorer"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. Make sure `.env` contains your key, then publish the build to the `gh-pages` branch:

   ```bash
   npm run deploy
   ```

3. On GitHub, open **Settings > Pages**, set **Source** to **Deploy from a branch**, choose the `gh-pages` branch and the `/ (root)` folder, then save.
4. After a minute your site is live at `https://<your-username>.github.io/<your-repo>/`.

> **About the API key:** Vite bakes `VITE_` variables into the built JavaScript, so a TMDB key is visible to anyone who inspects a deployed frontend app. TMDB v3 keys are free and read-only for this use, but never reuse a key tied to anything sensitive.

## Troubleshooting

| Message | Fix |
| --- | --- |
| "Missing TMDB API key" | Create `.env` from `.env.example` and restart `npm run dev` |
| "TMDB rejected the API key" | Copy the v3 API Key, not the Read Access Token |
| Blank page after deploy | Run `npm run deploy` again and confirm Pages uses the `gh-pages` branch |

## Credits

Movie data and images are provided by [TMDB](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB.
