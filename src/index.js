import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SightingInfo from "./components/Sighting";
import SightingForm from "./components/SightingForm";
import ErrorPage from "./error-page";
import CommentList from "./components/Comments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "sighting/:sightingID",
        element: (
          <>
            <SightingInfo />
            <CommentList />
          </>
        ),
      },
      { path: "sighting/new", element: <SightingForm /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
