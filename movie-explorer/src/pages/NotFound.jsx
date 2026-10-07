import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="state">
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist or has moved.</p>
      <Link className="btn" to="/">Back to home</Link>
    </div>
  );
}
