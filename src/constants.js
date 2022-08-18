export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://powerful-caverns-02560.herokuapp.com"
    : "http://localhost:3000";
