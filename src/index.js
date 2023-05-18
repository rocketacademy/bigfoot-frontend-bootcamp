import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Sightings from "./Sightings";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SightingsAll from "./SightingsAll";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sightings",
    element: <SightingsAll />,
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
