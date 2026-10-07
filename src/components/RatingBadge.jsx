/** Circular score badge: TMDB gives 0-10, shown as a percentage ring. */
export default function RatingBadge({ value = 0, votes, size = "sm" }) {
  const pct = Math.round(value * 10);
  const hasScore = value > 0;
  const tone = !hasScore ? "none" : pct >= 70 ? "good" : pct >= 50 ? "mid" : "low";
  return (
    <div
      className={`rating rating--${size} rating--${tone}`}
      style={{ "--pct": `${hasScore ? pct : 0}%` }}
      title={votes ? `${value.toFixed(1)} / 10 from ${votes.toLocaleString()} votes` : undefined}
      aria-label={hasScore ? `Rated ${value.toFixed(1)} out of 10` : "Not rated yet"}
    >
      <span>{hasScore ? value.toFixed(1) : "NR"}</span>
    </div>
  );
}
