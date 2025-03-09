import React from "react";
import "../Styles/Footer.css";
import Logo from "../Assets/Logo.png";
import LogoTMDB from "../Assets/logo_tmdb.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-mobile">
        <img src={Logo} alt="Random Cinema Logo" className="footer-logo" />
        <div className="footer-links">

          <div className="footer-section">
            <h3>Follow Us</h3>
            <ul>
              <li>Instagram</li>
              <li>TikTok</li>
              <li>YouTube</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul>
              <li>Email</li>
              <li>Phone</li>
              <li>Indonesia</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Special thanks</h3>
            <img src={LogoTMDB} alt="TMDB Logo" className="tmdb-logo" />
          </div>

        </div>
        <hr className="footer-divider" />
        <p className="footer-copyright">Created by <span style={{ color: '#FF914D', fontWeight: 'bold' }}>Owen Rangngan</span> | &copy; 2025</p>

      </div>
    </footer>
  );
};

export default Footer;