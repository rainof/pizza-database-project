import React from 'react';
import heroMobile from '../assets/hero-mobile.jpg';
// import heroDesktop from '../assets/hero-desktop.jpg';

const HeroImage = () => {
  return (
    <div className="text-center bg-yellow-200 py-8">
      <picture>
        {/* <source srcSet={heroDesktop} media="(min-width: 768px)" /> */}
        <img src={heroMobile} alt="Delicious Pizza" className="mx-auto w-full max-w-md" />
      </picture>
      <h1 className="mt-4 text-3xl font-bold text-orange-600">
        Your Favorite Pizza Delivered Fast!
      </h1>
    </div>
  );
};

export default HeroImage;
