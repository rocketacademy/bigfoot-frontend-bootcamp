import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';

const App = () => (
  <div className='App'>
    <header className='App-header'>
      <Outlet />
    </header>
  </div>
);

export default App;
