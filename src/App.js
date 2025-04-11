import React, { useState, useEffect } from 'react';
import Door from './components/Door';
import Invitation from './components/Invitation';
import door1Image from './images/door1.jpg';
import door2Image from './images/door2.jpg';

const App = () => {
  const [areDoorsOpen, setDoorsOpen] = useState(false);
  const [isDoorLoaded, setDoorLoaded] = useState(false);

  useEffect(() => {
    // Preload door images
    const preloadImages = [door1Image, door2Image].map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    Promise.all(preloadImages.map((img) => new Promise((resolve) => {
      img.onload = resolve;
    }))).then(() => {
      setDoorLoaded(true); // Mark door images as loaded
    });
  }, []);

  useEffect(() => {
    if (isDoorLoaded) {
      const timer = setTimeout(() => {
        setDoorsOpen(true);
      }, 1000); // Delay of 1 second
      return () => clearTimeout(timer);
    }
  }, [isDoorLoaded]);

  return (
    <div className="app">
      {isDoorLoaded && (
        <Door isOpen={areDoorsOpen} door1Image={door1Image} door2Image={door2Image} />
      )}
      {areDoorsOpen && (
        <div className="invitation-background">
          <Invitation />
        </div>
      )}
    </div>
  );
};

export default App;
