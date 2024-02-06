import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './Components/App';
import SightingPreviewList from './Components/SightingsPreviewList';
import Sighting from './Components/Sighting';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      {/* Route that provides base app UI */}
      <Route path="/" element={<App />}>
        {/* Route that renders all sightings */}
        <Route index element={<SightingPreviewList />} />
        {/* Route that renders individual sightings */}
        <Route path="sightings/:sightingIndex" element={<Sighting />} />
        {/* Route that matches all other paths */}
        <Route path="*" element={'Nothing here!'} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
