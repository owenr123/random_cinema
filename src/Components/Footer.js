import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Logo from '../Assets/Logo.png';  // Import the logo

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center text-md-left mb-3 mb-md-0">
            <Navbar.Brand href="#">
              <img
                src={Logo}
                alt="Random Cinema Logo"
                style={{ height: '40px' }}
              />
            </Navbar.Brand>
            <p className="mt-2">
              created by <span style={{ color: '#FF914D' }}>Owen Rangngan</span> | &copy; 2024
            </p>
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center">
              <a href="https://facebook.com" className="text-white mx-2"><FaFacebookF /></a>
              <a href="https://twitter.com" className="text-white mx-2"><FaTwitter /></a>
              <a href="https://instagram.com" className="text-white mx-2"><FaInstagram /></a>
              <a href="https://linkedin.com" className="text-white mx-2"><FaLinkedinIn /></a>
            </div>
          </Col>
          <Col md={4} className="text-center text-md-right">
            <h5>Contact Us</h5>
            <p>Email: info@randomcinema.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
