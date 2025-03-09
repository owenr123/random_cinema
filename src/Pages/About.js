import React, { useState } from 'react';
import '../Styles/About.css';
import aboutImage from '../Assets/about_img.jpg';
import Footer from '../Components/Footer';

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="about">

      <div className="about-container">
        <div className="about-form">

          <div className="about-img">
            <img src={aboutImage} alt="About" />
          </div>

          <div className="form-container">
            <h2>Send your message if you love movies🫶</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} />
              <input type="email" name="email" placeholder="E-Mail" value={formData.email} onChange={handleInputChange} />
              <textarea name="message" placeholder="Type Message" value={formData.message} onChange={handleInputChange}></textarea>
              <button type="submit" className="about-btn">Send</button>
            </form>
          </div>
          
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
