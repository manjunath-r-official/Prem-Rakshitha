import React, { useState, useEffect } from 'react';
import '../styles/Carousel.css';

const Carousel = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [images.length, interval]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="carousel-slide" key={index}>
            <img src={image} alt={`Slide ${index + 1}`} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
