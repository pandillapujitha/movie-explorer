/** Skeleton placeholders that mimic the movie grid while data loads. */
export function GridSkeleton({ count = 12 }) {
  return (
    <div className="grid" aria-busy="true" role="status">
      <span className="sr-only">Loading movies</span>
      {Array.from({ length: count }, (_, i) => (
        <div className="card skeleton" key={i}>
          <div className="card__poster" />
          <div className="card__body">
            <div className="skeleton__line" />
            <div className="skeleton__line short" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Spinner({ label = "Loading" }) {
  return (
    <div className="spinner-wrap" role="status">
      <div className="spinner" />
      <span>{label}</span>
    </div>
  );
}
