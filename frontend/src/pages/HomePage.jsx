import React from 'react';
import Navbar from '../components/Navbar';
import MenuSection from '../components/MenuSection';
import HeroImage from '../components/HeroImage';


const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroImage />
      <MenuSection />
    </div>
  );
};

export default HomePage;