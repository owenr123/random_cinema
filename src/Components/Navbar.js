import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Styles/Navbar.css";
import Logo from "../Assets/Logo.png";

const Navbar = () => {
  const location = useLocation();
  const [dropdown, setDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Cek apakah di halaman aktif atau di dalam submenu
const isActive = (path) => location.pathname.startsWith(path) ? "active" : "";
const isParentActive = (parent) => location.pathname.startsWith(parent) ? "active" : "";

  // Toggle Dropdown
  const toggleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  // Toggle Menu Hamburger
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Update ukuran window saat resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobileView = windowWidth <= 768;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={Logo} alt="Random Cinema" />
      </div>

      {/* Hamburger Menu di Mobile */}
      {isMobileView && (
        <div className="hamburger" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      )}

      <ul className={`navbar-links ${isMobileView ? "slide-menu" : ""} ${isMenuOpen ? "active" : ""}`}>
        <li><a href="/homepage" className={isActive("/homepage")}>Homepage</a></li>

        {/* Movies Dropdown */}
        <li className={`dropdown ${isParentActive("/movies")}`}>
          <a
            href="/movies"
            className={`dropdown-toggle ${isParentActive("/movies")}`}
            onClick={(e) => {
              e.preventDefault();
              toggleDropdown("movies");
            }}
          >
            Movies
          </a>
          {dropdown === "movies" && (
            <ul className={`dropdown-menu ${isMobileView ? "mobile-dropdown" : ""}`}>
              <li><a href="/movies/popular" className={isActive("/movies/popular")}>Popular</a></li>
              <li><a href="/movies/now-playing" className={isActive("/movies/now-playing")}>Now Playing</a></li>
              <li><a href="/movies/coming-soon" className={isActive("/movies/coming-soon")}>Coming Soon</a></li>
            </ul>
          )}
        </li>

        {/* TV Series Dropdown */}
        <li className={`dropdown ${isParentActive("/tv-series")}`}>
          <a
            href="/tv-series"
            className={`dropdown-toggle ${isParentActive("/tv-series")}`}
            onClick={(e) => {
              e.preventDefault();
              toggleDropdown("tv-series");
            }}
          >
            TV Series
          </a>
          {dropdown === "tv-series" && (
            <ul className={`dropdown-menu ${isMobileView ? "mobile-dropdown" : ""}`}>
              <li><a href="/tv-series/popular" className={isActive("/tv-series/popular")}>Popular</a></li>
              <li><a href="/tv-series/now-playing" className={isActive("/tv-series/now-playing")}>Now Playing</a></li>
              <li><a href="/tv-series/top-rated" className={isActive("/tv-series/top-rated")}>Top Rated</a></li>
            </ul>
          )}
        </li>

        <li><a href="/actors" className={isActive("/actors")}>Actors</a></li>
        <li><a href="/about" className={isActive("/about")}>About</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
