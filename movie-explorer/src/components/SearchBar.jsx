export default function SearchBar({ value, onChange }) {
  return (
    <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm9 16-4.2-4.2" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a movie title"
        aria-label="Search movies"
      />
      {value && (
        <button type="button" className="search__clear" onClick={() => onChange("")}>
          Clear
        </button>
      )}
    </form>
  );
}
