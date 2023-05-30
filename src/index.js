import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Sightings from "./Sightings";
import NewSighting from "./NewSighting";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/new",
    element: <NewSighting />,
  },
  {
    path: "/sightings/:sightingIndex",
    element: <Sightings />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
