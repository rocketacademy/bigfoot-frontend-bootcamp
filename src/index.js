import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Sighting from "./components /Sighting";
import SightingPreview from "./components /SightingPreview";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ErrorPage from "./components /ErrorPage";
import NewSighting from "./components /NewSighting";
import EditSighting from "./components /EditSighting";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <SightingPreview />,
      },
      {
        path: "sightings/:sightingID",
        element: <Sighting />,
      },
      {
        path: "/new", 
        element: <NewSighting />, 
      }, 
      {
        path: "sightings/:sightingID/edit", 
        element: <EditSighting />
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
