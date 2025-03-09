import React, { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import SectionHero from "../Components/SectionHero";
import SectionTrailer from "../Components/SectionTrailer";
import SectionLogo from "../Components/SectionLogo";
import SectionTagline from "../Components/SectionTagline";
import Footer from "../Components/Footer";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Loading minimal 2 detik
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <BarLoader
            width={200}
            height={6}
            cssOverride={{
              background: 'linear-gradient(to right, #ff6b6b, #ffcc00)',
              borderRadius: '8px',
            }}
          />
        </div>
      ) : (
        <>
          <SectionHero />
          <SectionTrailer />
          <SectionLogo />
          <SectionTagline />
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomePage;
