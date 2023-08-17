import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import Sighting from "./Sighting";
import SightingList from "./SightingList";
import New from "./New";
import EditSighting from "./EditSighting";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: "Error 404: Your link is not valid!",
    children: [
      { index: true, element: <SightingList /> },
      { path: "/sightings/:sightingIndex", element: <Sighting /> },
      { path: "/new", element: <New /> },
      { path: "/sightings/:sightingIndex/edit", element: <EditSighting /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
