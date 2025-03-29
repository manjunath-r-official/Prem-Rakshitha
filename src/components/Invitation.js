import React, { useState, useEffect, useRef } from 'react';
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
  const weddingDate = new Date('2025-04-20T09:45:00'); // Updated wedding date and time
  const [timeRemaining, setTimeRemaining] = useState({});
  const rowsRef = useRef([]); // Ref to track rows
  const headingRef = useRef(null); // Ref to track the heading

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

  const paragraphTexts = [
    "First Step: Promise to nourish and support each other.",
    "Second Step: Commitment to grow together in strength and prosperity.",
    "Third Step: Dedication to spiritual growth and happiness.",
    "Fourth Step: Promise to love, respect, and trust each other.",
    "Fifth Step: Commitment to care for family and children.",
    "Sixth Step: Pledge for harmony, longevity, and companionship.",
    "Seventh Step: Promise of lifelong friendship and loyalty."
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target;
          if (entry.isIntersecting) {
            element.classList.add('in-view'); // Add animation class when in view
          } else {
            element.classList.remove('in-view'); // Remove animation class when out of view
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    // Observe the heading
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    // Observe the rows
    rowsRef.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
      rowsRef.current.forEach((row) => {
        if (row) observer.unobserve(row);
      });
    };
  }, []);

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
          <p className="wedding-date">April 19th & 20th, 2025</p>
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

      <div className="section-4">
        <div className="groom-name">
          <h1>Pream</h1> {/* Replace with the groom's name */}
        </div>
        <div className="rotating-mandala">
          <div className="mandala-container">
            <img src={require('../images/mandala.png')} alt="Mandala" className="mandala" />
            <img src={require('../images/feather.png')} alt="Small Image" className="small-image" />
          </div>
        </div>
      </div>

      <div className="section-5">
        <div
          ref={headingRef} // Attach ref to the heading
          className="section-5-heading"
        >
          <h1 className="main-heading">#Saptapadi</h1>
          <h2 className="sub-heading">
            Seven Sacred Steps, Seven Promises, One Beautiful Journey
            <img src={require('../images/feather.png')} alt="Feather" className="feather-image" />
          </h2>
        </div>
        <div className="rows-container">
          {paragraphTexts.map((text, index) => (
            <div
              key={index}
              ref={(el) => (rowsRef.current[index] = el)} // Attach ref to each row
              className={`row ${index % 2 === 0 ? 'even' : 'odd'}`}
            >
              {index % 2 === 0 ? (
                <>
                  <div className="column image-column">
                    <img src={require(`../images/carousel/${index + 1}.jpg`)} alt={`Row ${index + 1}`} />
                  </div>
                  <div className="column text-column">
                    <p>{text}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="column text-column">
                    <p>{text}</p>
                  </div>
                  <div className="column image-column">
                    <img src={require(`../images/carousel/${index + 1}.jpg`)} alt={`Row ${index + 1}`} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="section-2">
        <h1>Join Us in Celebrating Love</h1>
        <p>We are thrilled to invite you to our wedding celebration.</p>
      </div>

    </div>
  );
};

export default Invitation;
