import React from "react";
import "../styles/ThreeDSlider.css";

const ThreeDSlider = () => {
  const slides = [
    { id: 1, image: require("../images/carousel/1.jpg") },
    { id: 2, image: require("../images/carousel/2.jpg") },
    { id: 3, image: require("../images/carousel/3.jpg") },
    { id: 4, image: require("../images/carousel/4.jpg") },
    { id: 5, image: require("../images/carousel/5.jpg") },
    { id: 6, image: require("../images/carousel/6.jpg") },
    { id: 7, image: require("../images/carousel/7.jpg") },
    { id: 8, image: require("../images/carousel/8.jpg") },
    { id: 9, image: require("../images/carousel/9.jpg") },
  ];

  return (
    <div className="three-d-slider">
      <div className="slider-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="slider-card"
            style={{
              "--i": index,
            }}
          >
            <img src={slide.image} alt={`Slide ${index + 1}`} className="slider-image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeDSlider;
