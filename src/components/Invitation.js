import React, { useState, useEffect } from 'react';
import '../styles/Invitation.css';
import Video from '../video/vid.mp4';
import Carousel from './Carousel';

// Import images
import image1 from '../images/carousel/1.jpg';
import image2 from '../images/carousel/2.jpg';
import image3 from '../images/carousel/3.jpg';
import image4 from '../images/carousel/4.jpg';
import image5 from '../images/carousel/5.jpg';
import image6 from '../images/carousel/6.jpg';
import image7 from '../images/carousel/7.jpg';
import image8 from '../images/carousel/8.jpg';

const Invitation = () => {
  const weddingDate = new Date('2025-04-18T00:00:00');
  const [timeRemaining, setTimeRemaining] = useState({});
  const carouselImages = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ]; // Use imported images

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  const getColorForSeconds = (seconds) => {
    const colors = [
      '#ff4500', '#1e90ff', '#32cd32', '#ff1493', '#ffa500',
      '#8a2be2', '#00ced1', '#dc143c', '#7fff00', '#ff6347',
      '#4682b4', '#daa520', '#ff69b4', '#00fa9a', '#ff7f50',
      '#6a5acd', '#20b2aa', '#ff00ff', '#adff2f', '#ffdab9'
    ]; // Array of 20 colors
    return colors[seconds % colors.length]; // Cycle through colors based on seconds
  };

  return (
    <div className="invitation-container">
      <div className="video-section">
        <video autoPlay muted loop>
          <source src={Video} type="video/mp4" />
          this is video
        </video>
      </div>

      <div className="section-1">
        <div className="slide-in-left">
          <h1>Save the Date</h1>
          <p className="wedding-date">April 19, 2025</p>
        </div>
        <div className="slide-in-right">
          <p className="countdown-inline">
            <span>{timeRemaining.days}</span> Days, 
            <span>{timeRemaining.hours}</span> Hrs, 
            <span>{timeRemaining.minutes}</span> Mins,  
            <span className="seconds-wrapper">
              <span
                key={timeRemaining.seconds}
                className="seconds"
                style={{ color: getColorForSeconds(timeRemaining.seconds) }}
              >
                {timeRemaining.seconds}
              </span>
            </span> Seconds
          </p>
          <p>Mark your calendar for a day filled with joy and happiness.</p>
        </div>
      </div>

      <div className="section-3">
        <Carousel images={carouselImages} />
      </div>

      <div className="section-2">
        <h1>Join Us in Celebrating Love</h1>
        <p>We are thrilled to invite you to our wedding celebration.</p>
      </div>

    </div>
  );
};

export default Invitation;
