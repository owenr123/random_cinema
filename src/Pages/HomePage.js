import React from 'react';
import HomepageHeroSection from '../Components/HomePageHeroSection';
import HomePageTrailerSection from '../Components/HomePageTrailerSection';
import HomePageTestimoniSection from '../Components/HomePageTestimoniSection';

const Homepage = () => {
  return (
    <div className="homepage">
      <HomepageHeroSection />
      <HomePageTrailerSection />
      <HomePageTestimoniSection />
    </div>
  );
};

export default Homepage;
