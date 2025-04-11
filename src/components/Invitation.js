import React, { useState, useEffect, useRef } from 'react';
import '../styles/Invitation.css';
import Video from '../video/vid.mp4';
import bannerVideo from '../video/bannervideo.mp4';
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
          <source src={bannerVideo} type="video/mp4" />
        </video>
        <div className="animated-text">
          <span>Prem</span>
          <span className="weds">Weds</span>
          <span>Rakshitha</span>
        </div>
        <img
          src={require('../images/feather.png')}
          alt="Feather"
          className="feather-animation"
        />
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
                    <img src={require(`../images/saptapadi/s${index + 1}.jpeg`)} alt={`Row ${index + 1}`} loading="lazy" />
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
                    <img src={require(`../images/saptapadi/s${index + 1}.jpeg`)} alt={`Row ${index + 1}`} loading="lazy" />
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
          <img src={require('../images/cards/reception.jpeg')} alt="Reception" className="card-image" />
          <div className="card-content">
            <h2>Reception</h2>
            <p>Date: April 19th, 2025</p>
            <p>Time: 7:30 PM</p>
          </div>
        </div>

        <div
          ref={(el) => (cardsRef.current[1] = el)} // Attach ref to the wedding card
          className="card wedding-card"
        >
          <img src={require('../images/cards/wedding.jpeg')} alt="Wedding" className="card-image" />
          <div className="card-content">
            <h2>Wedding</h2>
            <p>Date: April 20th, 2025</p>
            <p>Time: 9:45 AM to 10:45 AM</p>
          </div>
        </div>

        <div
          ref={(el) => (cardsRef.current[2] = el)} // Attach ref to the venue card
          className="card venue-card"
        >
          <div className="mandala-overlay venue-mandala">
            <img src={require('../images/mandala.png')} alt="Mandala" className="mandala-image" />
          </div>
          <img src={require('../images/bg3.jpg')} alt="Venue" className="card-image" />
          <div className="card-content venue-content">
            <h2>Venue</h2>
            <p>Jayamma Kalegowda Kalyana Mantapa</p>
            <p>Chinakuruli, Mysore Road - 571455</p>
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
        </div>

        <div
          ref={(el) => (cardsRef.current[3] = el)} // Attach ref to the contact card
          className="card contact-card"
        >
          <div className="mandala-overlay">
            <img src={require('../images/mandala.png')} alt="Mandala" className="mandala-image" />
          </div>
          <img src={require('../images/bg2.jpg')} alt="Contact" className="card-image" />
          <div className="card-content">
            <h2>Contact Us</h2>
            <p>+91 9108710537</p>
            <p>+91 8618829734</p>
            <p>+91 9740281336</p>
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

      <footer className="footer">
        <p>© 2025 Forever-Invites. All rights reserved.</p>
        <p>
          Designed by Friend <span style={{ color: 'red' }}>♥</span>
        </p>
        <p 
          className="footer-whatsapp-text" 
          onClick={() => window.open('https://wa.me/+917483147151', '_blank')}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            fill="currentColor" 
            className="bi bi-whatsapp whatsapp-logo" 
            viewBox="0 0 16 16"
          >
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
          </svg>
          WhatsApp me - for custom websites
        </p>
      </footer>
    </div>
  );
};

export default Invitation;
