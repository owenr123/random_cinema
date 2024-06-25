import React, { useState, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../Components/Navbar.css';
import Logo from '../Assets/Logo.png';  // Import the logo

const AppNavbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const navbarCollapseRef = useRef(null);

  const handleNavLinkClick = (path) => {
    setActiveLink(path);
    // Navigate to top of the page
    window.scrollTo({ top: 0, behavior: 'auto' }); // Change 'auto' to 'smooth' for smooth scroll if needed

    // Close the navbar if it's open
    if (navbarCollapseRef.current && navbarCollapseRef.current.classList.contains('show')) {
      navbarCollapseRef.current.classList.remove('show');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
      <Container className="navbar-container">
        <Navbar.Brand as={Link} to="/">
          <img
            src={Logo}
            alt="Random Cinema Logo"
            style={{ height: '40px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" ref={navbarCollapseRef} className="justify-content-end">
          <Nav>
            <Nav.Link
              as={Link}
              to="/"
              className={activeLink === '/' ? 'active' : ''}
              onClick={() => handleNavLinkClick('/')}
            >
              Home
            </Nav.Link>
            <div className="nav-item">
              <Nav.Link
                className={`movies-link ${activeLink.startsWith('/movies') ? 'active' : ''}`}
                onClick={() => handleNavLinkClick('/movies')}
              >
                Movies
              </Nav.Link>
              <div className="submenu">
                <Link to="/movies/popular" onClick={() => handleNavLinkClick('/movies/popular')}>Popular</Link>
                <Link to="/movies/coming-soon" onClick={() => handleNavLinkClick('/movies/coming-soon')}>Coming Soon</Link>
                <Link to="/movies/now-playing" onClick={() => handleNavLinkClick('/movies/now-playing')}>Now Playing</Link>
              </div>
            </div>
            <div className="nav-item">
              <Nav.Link
                className={`tvseries-link ${activeLink.startsWith('/tv-series') ? 'active' : ''}`}
                onClick={() => handleNavLinkClick('/tv-series')}
              >
                TV Series
              </Nav.Link>
              <div className="submenu">
                <Link to="/tv-series/popular" onClick={() => handleNavLinkClick('/tv-series/popular')}>Popular</Link>
                <Link to="/tv-series/top-rated" onClick={() => handleNavLinkClick('/tv-series/top-rated')}>Top Rated</Link>
                <Link to="/tv-series/now-playing" onClick={() => handleNavLinkClick('/tv-series/now-playing')}>Now Playing</Link>
              </div>
            </div>
            <div className="nav-item">
              <Nav.Link
                className={`actors-link ${activeLink.startsWith('/actors') ? 'active' : ''}`}
                onClick={() => handleNavLinkClick('/actors')}
              >
                Actors
              </Nav.Link>
              <div className="submenu">
                <Link to="/actors/popular" onClick={() => handleNavLinkClick('/actors/popular')}>Popular Actors</Link>
              </div>
            </div>
            <Nav.Link
              as={Link}
              to="/about"
              className={activeLink === '/about' ? 'active' : ''}
              onClick={() => handleNavLinkClick('/about')}
            >
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
