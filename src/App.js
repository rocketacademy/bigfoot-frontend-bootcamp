import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sightings } from './components/Sightings';
import { Sighting } from './components/Sighting';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route index path="sightings" element={<Sightings />} />
            <Route path="/sightings/:sightingIndex" element={<Sighting />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}
export default App;
