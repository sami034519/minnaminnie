import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from "./images/Mob-banner1.jpg"
// Import your images
import 'animate.css';

import img2 from './images/Mob-banner2.jpg';
import img3 from './images/Mob-banner3.jpg';
import img4 from './images/Mob-banner4.jpg';

const images = [img1, img2, img3, img4];

const ImageCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    arrows: false,
    beforeChange: (_, next) => setActiveIndex(next),
  };

  return (
     <div className="w-full mx-auto py-5 px-4">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index} className="px-2">
            <div className="overflow-hidden rounded-lg h-auto lg:h-[100vh]  flex items-center justify-center">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className={`w-full h-full object-cover transition-transform duration-1000 ${
                  activeIndex === index
                    ? 'animate__animated animate__zoomIn animate__delay-1s'
                    : ''
                }`}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
