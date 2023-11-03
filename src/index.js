import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from 'axios';
import {Sighting} from './Routes/Sighting.js'
import {SightingsForm} from './Routes/SightingsForm.js'
import {RegisterSighting} from './Routes/RegisterSighting.js'
import {SightingList, loader as sightingLoader} from './Routes/SightingList'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import ErrorPage from './error-page';
import {BACKEND_URL} from './constants.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />, // we want to select create new/ pull sightings
        children: [
            {
                path: 'sightings/:id',
                element: <Sighting />
            },
            {
                path: 'sightings/:id/edit',
                element: <RegisterSighting />,
                loader: async ({params}) => {
                    return axios.get(`${BACKEND_URL}/sightings/${params.id}`)
                }
            },
            {
                path: 'sightings',
                element:<SightingList />,
                //loader: sightingLoader, // doing this with loader first; later can consider using useEffect and useSearchParams
            },
            {
                path: 'getsightings',
                element:<SightingsForm />
            }, // index will be filterform; upon sending the request sightinglist will display; 
            // current difficulty is passing the filter info from sightingsform to sightinglist - by props? go study react router first
            {
                path: 'newsighting',
                element:<RegisterSighting />,
                //loader: sightingLoader, // doing this with loader first; later can consider using useEffect and useSearchParams
            },
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router = {router}/>
    );
