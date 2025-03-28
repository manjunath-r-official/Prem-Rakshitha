// App.js
import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Door from './components/Door';
import Home from './components/Home';
import Invitation from './components/Invitation';
import './styles/App.css';

const App = () => {
  const [areDoorsOpen, setDoorsOpen] = React.useState(false);
  const handleDoorsOpen = () => {
    setDoorsOpen(true);
  };

  const location = useLocation();


  return (
    
      <div className="app">
      {location.pathname === '/' && (        
          <div className="door-container">
            <Door isOpen={areDoorsOpen} onOpen={handleDoorsOpen} />
          </div>
      )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/invitation"
            element={<Invitation />}
          />
        </Routes>
      </div>
    
  );
};

export default App;
