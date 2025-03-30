import React, { useState, useEffect, useRef } from 'react';
import '../styles/Invitation.css';
import Video from '../video/vid.mp4';
import Carousel from './Carousel';
import ThreeDSlider from "./ThreeDSlider"; // Import the ThreeDSlider component

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
  const cardsRef = useRef([]); // Ref to track cards

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
      { threshold: 0 } // Trigger when 50% of the element is visible
    );

    // Observe the heading
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    // Observe the rows
    rowsRef.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    // Observe the cards
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
      rowsRef.current.forEach((row) => {
        if (row) observer.unobserve(row);
      });
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []); // Removed `hasTyped` dependency

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

      {/* <div className="section-4">
        <div className="groom-name">
          <h1>Pream</h1>
        </div>
        <div className="rotating-mandala">
          <div className="mandala-container">
            <img src={require('../images/mandala.png')} alt="Mandala" className="mandala" />
            <img src={require('../images/feather.png')} alt="Small Image" className="small-image" />
          </div>
        </div>
      </div> */}

      <div className="section-5">
        <div
          ref={headingRef} // Attach ref to the heading
          className="section-5-heading"
        >
          <h1 className="main-heading">
            <img src={require('../images/feather.png')} alt="Feather" className="feather-image" />
            #Saptapadi
          </h1>
          <h2 className="sub-heading">
            <span>Seven</span> <span>Sacred</span> <span>Steps,</span> <span>Seven</span> <span>Promises,</span> <span>One</span> <span>Beautiful</span> <span>Journey</span>
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
                    <img src={require(`../images/carousel/${index + 1}.jpg`)} alt={`Row ${index + 1}`} loading="lazy" />
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
                    <img src={require(`../images/carousel/${index + 1}.jpg`)} alt={`Row ${index + 1}`} loading="lazy" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="section-7">
        <ThreeDSlider /> {/* Add the 3D slider here */}
      </div>

      <div className="section-2">
        <h1>Join Us in Celebrating Love</h1>
        <p>We are thrilled to invite you to our wedding celebration.</p>
      </div>

      <div className="section-6">
        
        <div
          ref={(el) => (cardsRef.current[0] = el)} // Attach ref to the reception card
          className="card reception-card"
        >
          <h2>Reception</h2>
          <p>Date: April 19th, 2025</p>
          <p>Time: 6:00 PM</p>
        </div>

        <div
          ref={(el) => (cardsRef.current[1] = el)} // Attach ref to the wedding card
          className="card wedding-card"
        >
          <h2>Wedding</h2>
          <p>Date: April 20th, 2025</p>
          <p>Time: 9:45 AM to 10:45 AM</p>
        </div>

        <div
          ref={(el) => (cardsRef.current[2] = el)} // Attach ref to the venue card
          className="card venue-card"
        >
          <h2>Venue</h2>
          <p>Jayamma Kalegowda Kalyana Mantapa
          Chinakuruli, Mysore Road - 571455</p>
          <button
            className="google-maps-button"
            onClick={() =>
              window.open(
                'https://www.google.com/maps/place/Jayamma+Kalegowda+Kalyana+Mantapa/@12.5393471,76.6007737,17z/data=!3m1!4b1!4m6!3m5!1s0x3baf83208a751ba3:0xa5a8052561fdfc92!8m2!3d12.5393471!4d76.6007737!16s%2Fg%2F11j0v2ckzr?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoASAFQAw%3D%3D',
                '_blank'
              )
            }
          >
            Open in Google Maps
          </button>
        </div>

        <div
          ref={(el) => (cardsRef.current[3] = el)} // Attach ref to the contact card
          className="card contact-card"
        >
          <h2>Contact Us</h2>
          <p>+91 9108710537</p>
          <p>+91 9740281336</p>
          <p>+91 8892346969</p>
          <button
            className="whatsapp-button"
            onClick={() =>
              window.open('https://wa.me/+919108710537', '_blank')
            }
          >
            WhatsApp Me
          </button>
        </div>

      </div>

    </div>
  );
};

export default Invitation;
