import React, { useState, useEffect } from 'react';
import CustomLoader from '../Components/CustomLoader';
import '../Pages/About.css';

const About = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Simulate loading with a timeout
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulated delay
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to backend or perform local operations
    console.log('Form submitted:', formData);
    // Reset form fields if needed
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    loading ? <CustomLoader /> : (
      <section className="about-section">
        <div className="about-container container">
          <div className="about-img">
            <img src="https://lh3.googleusercontent.com/jIGLvb7A1-2Hd0WjEFUpJSvVLZ34BXQzXpa-c2s_gcEb7uJ4yKkpYGcECFStCjEBVuYeeHitIqDjK4pLYEBy2Zx3=w640-h400-e365-rj-sc0x00ffffff" alt="" />
          </div>
          <div className="form-container">
            <h2>Send your message if you love movies🫶</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="E-Mail"
                value={formData.email}
                onChange={handleInputChange}
              />
              <textarea
                cols="30"
                rows="6"
                name="message"
                placeholder="Type Message"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
              <button type="submit" className="about-btn">Send</button>
            </form>
          </div>
        </div>
      </section>
    )
  );
};

export default About;
