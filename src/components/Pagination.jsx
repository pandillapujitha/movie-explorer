export default function Pagination({ page, totalPages, onChange }) {
  const last = Math.min(totalPages, 500); // TMDB only serves the first 500 pages
  if (last <= 1) return null;
  return (
    <nav className="pagination" aria-label="Pagination">
      <button className="btn btn--ghost" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Previous
      </button>
      <span>Page {page} of {last}</span>
      <button className="btn btn--ghost" disabled={page >= last} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </nav>
  );
}
