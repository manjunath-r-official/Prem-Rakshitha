import React, { useState, useEffect } from 'react';
import Door from './components/Door';
import Invitation from './components/Invitation';

const App = () => {
  const [areDoorsOpen, setDoorsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDoorsOpen(true);
    }, 1000); // Delay of 1 second
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <div className="invitation-background">
        <Invitation />
      </div>
      <Door isOpen={areDoorsOpen} />
    </div>
  );
};

export default App;
