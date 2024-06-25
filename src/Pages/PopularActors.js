import React, { useState, useEffect } from 'react';
import CustomLoader from '../Components/CustomLoader';
import axios from 'axios';
import '../Pages/PopularActors.css';

const PopularActors = () => {
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/person/popular`, {
          params: {
            api_key: process.env.REACT_APP_TMDB_KEY,
          },
        });
        setActors(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the popular actors:', error);
        setLoading(false);
      }
    };

    fetchActors();
  }, []);

  return (
    <div className="actors-container mt-4">
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <h1 className="actors-title">Popular Actors</h1>
          <div className="actors-cards-row justify-content-center">
            {actors.map(actor => (
              <div className="actors-custom-col mb-4" key={actor.id}>
                <div className="actors-cards text-center">
                  <div className="actors-cards-img-container">
                    <img 
                      src={`${process.env.REACT_APP_IMG_URL}${actor.profile_path}`} 
                      className="actors-cards-img" 
                      alt={actor.name} 
                    />
                  </div>
                  <div className="actors-cards-body">
                    <h5 className="actors-cards-name">{actor.name}</h5>
                    <p className="actors-cards-text">Known for: {actor.known_for.map(movie => movie.title || movie.name).join(', ')}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PopularActors;
