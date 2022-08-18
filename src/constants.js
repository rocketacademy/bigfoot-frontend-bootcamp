export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://warm-cove-15774.herokuapp.com"
    : "http://localhost:3000";
