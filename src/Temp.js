import { Link } from "react-router-dom";

export default function TempPage() {
  return (
    <div>
      <h2>This is a temperoray page to test out Links</h2>
      <h3>Or there could be an error 404, page not found</h3>
      <Link to="/" style={{ textDecoration: "none" }}>
        Back
      </Link>
    </div>
  );
}
