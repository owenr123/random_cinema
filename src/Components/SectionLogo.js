import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/SectionLogo.css";

const SectionLogo = () => {
  const [logos, setLogos] = useState([]);
  const placeholderLogo = "https://via.placeholder.com/150?text=No+Logo";

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/configuration?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        const logoBaseURL = response.data.images.secure_base_url + "original";

        const productionCompanyIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // ID Production Houses

        const logoRequests = productionCompanyIds.map((id) =>
          axios.get(
            `${process.env.REACT_APP_BASE_URL}/company/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
          )
        );

        const results = await Promise.all(logoRequests);
        const fetchedLogos = results.map((res) => ({
          id: res.data.id,
          logo: res.data.logo_path ? `${logoBaseURL}${res.data.logo_path}` : placeholderLogo,
        }));

        setLogos(fetchedLogos);
      } catch (error) {
        console.error("Error fetching logos:", error);
      }
    };

    fetchLogos();
  }, []);

  return (
    <div className="logo-container">
      <div className="logo-track">
        {logos.concat(logos).map((logo, index) => (
          <img key={index} src={logo.logo} alt="Production Logo" className="logo-item" />
        ))}
      </div>
    </div>
  );
};

export default SectionLogo;
