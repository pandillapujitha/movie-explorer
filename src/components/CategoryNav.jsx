import { CATEGORIES, TELUGU_CATEGORY } from "../api/tmdb.js";

/** Category tabs plus Telugu Movies and a genre dropdown filter. */
export default function CategoryNav({
  category,
  genre,
  genres,
  disabled,
  onCategory,
  onGenre,
}) {
  return (
    <div className="filters">
      <div className="tabs" role="tablist" aria-label="Movie categories">
        {CATEGORIES.map((c) => {
          const active = !disabled && !genre && category === c.id;

          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={active}
              className={`tab ${active ? "is-active" : ""}`}
              onClick={() => onCategory(c.id)}
              disabled={disabled}
            >
              {c.label}
            </button>
          );
        })}

        {/* Telugu Movies button */}
        <button
          key={TELUGU_CATEGORY.id}
          role="tab"
          aria-selected={
            !disabled && !genre && category === TELUGU_CATEGORY.id
          }
          className={`tab ${
            !disabled && !genre && category === TELUGU_CATEGORY.id
              ? "is-active"
              : ""
          }`}
          onClick={() => onCategory(TELUGU_CATEGORY.id)}
          disabled={disabled}
        >
          {TELUGU_CATEGORY.label}
        </button>
      </div>

      <label className="select">
        <span>Genre</span>

        <select
          value={genre || ""}
          onChange={(e) => onGenre(e.target.value)}
          disabled={disabled}
        >
          <option value="">All genres</option>

          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}