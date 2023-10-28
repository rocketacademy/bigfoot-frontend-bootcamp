import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Sighting} from './Routes/Sighting.js'
import {SightingList} from './Routes/SightingList'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import ErrorPage from './error-page';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'sightings/:sightingIndex',
                element: <Sighting />
            },
            {
                index:true,
                element:<SightingList />
            }, // index will be filterform; upon sending the request sightinglist will display; 
            // current difficulty is passing the filter info from sightingsform to sightinglist - by props? go study react router first
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router = {router}/>
    );
