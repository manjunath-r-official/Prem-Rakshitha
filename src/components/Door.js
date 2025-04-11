import React, { useEffect, useState } from 'react';
import '../styles/Door.css';

const Door = ({ isOpen, door1Image, door2Image }) => {
  const [isFullyOpened, setFullyOpened] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setFullyOpened(true); // Mark the doors as fully opened
      }, 3000); // Match the door opening animation duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className={`door-container ${isFullyOpened ? 'no-z-index' : ''}`}>
      <div className={`wrapper ${isOpen ? 'transformed' : ''}`}>
        <div
          id="door-1"
          className="door door-1"
          style={{ backgroundImage: `url(${door1Image})` }}
        ></div>
        <div
          id="door-2"
          className="door door-2"
          style={{ backgroundImage: `url(${door2Image})` }}
        ></div>
      </div>
    </div>
  );
};

export default Door;
