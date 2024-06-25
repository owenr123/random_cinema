import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CustomLoader from '../Components/CustomLoader';
import '../Components/HomePageTestimoniSection.css';

const HomepageTestimoniSection = () => {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Simulate fetching data with a timeout
    setTimeout(() => {
      const fetchedTestimonials = [
        {
          id: 1,
          author: 'bule_kesasar',
          content: 'Pinjam dulu 100🫠',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3MSFKbpUQW3erDfem7rZdd5uzxCLApAr5xQ&s',
          rating: 4
        },
        {
          id: 2,
          author: '0101_luffy',
          content: 'Cool🔥',
          image: 'https://i.pinimg.com/736x/c5/54/e4/c554e43f99a991761cf2f6b4f4f65a0d.jpg',
          rating: 5
        },
        {
          id: 3,
          author: 'evangeline',
          content: 'Mantapps😍😍💪💪',
          image: 'https://i.pinimg.com/736x/dd/1c/03/dd1c03f5f6ed847abfbbb266d95699ad.jpg',
          rating: 3
        },
        {
          id: 4,
          author: 'esterfaith_',
          content: 'keren kanda😍🫶',
          image: 'https://i.pinimg.com/736x/c5/48/52/c5485255bb9f7c0d9591722cd09df2fc.jpg',
          rating: 4
        },
        {
          id: 5,
          author: 'maria_tikulayuk',
          content: 'cantiknyaaaaa😍🔥',
          image: 'https://i.pinimg.com/originals/6b/76/4b/6b764bfbce4abfbac3d2e63381a137df.jpg',
          rating: 5
        },
        {
          id: 6,
          author: 'owenrangngan',
          content: '😎🔥',
          image: 'https://media.licdn.com/dms/image/D5603AQEmyJQokQkwuw/profile-displayphoto-shrink_400_400/0/1700488153155?e=1723680000&v=beta&t=I7kJX4vltlCndu0fkDHg3umq6DHv8WFWTavhUIM73GU',
          rating: 3
        }
      ];
      setTestimonials(fetchedTestimonials);
      setLoading(false);
    }, 2000); // Simulated delay
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 3 ? 0 : prevIndex + 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 3 : prevIndex - 3));
  };

  return (
    loading ? <CustomLoader /> : (
      <div className="testimoni-section">
        <h2>What People Are Saying</h2>
        <div className="testimoni-wrapper">
          <button className="slider-button prev" onClick={prevSlide}><FaChevronLeft /></button>
          <div className="testimoni-cards">
            {testimonials.slice(currentIndex, currentIndex + 3).map(testimonial => (
              <div key={testimonial.id} className="testimoni-card">
                <div className="testimonial-image" style={{ backgroundImage: `url(${testimonial.image})` }}></div>
                <div className="testimonial-details">
                  <h3>{testimonial.author}</h3>
                  <p>{testimonial.content}</p>
                  <StarRating rating={testimonial.rating} />
                </div>
              </div>
            ))}
          </div>
          <button className="slider-button next" onClick={nextSlide}><FaChevronRight /></button>
        </div>
      </div>
    )
  );
};

const StarRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < rating ? 'star filled' : 'star'}>&#9733;</span>
  ));

  return <div className="star-rating">{stars}</div>;
};

export default HomepageTestimoniSection;
