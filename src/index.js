import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Sighting from './components/Sighting';
import PreviewList from './components/PreviewList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      {/* Route that provides base app UI */}
      <Route path='/' element={<App />}>
        {/* Route that renders all sightings */}
        <Route index element={<PreviewList />} />
        {/* Route that renders individual sightings */}
        <Route path='sightings/:sightingIndex' element={<Sighting />} />
        {/* Route that matches all other paths */}
        <Route path='*' element={'Nothing here!'} />
      </Route>
    </Routes>
  </BrowserRouter>
);
