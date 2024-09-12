import React, { useState, useEffect } from 'react';
import CustomLoader from '../Components/CustomLoader';
import axios from 'axios';
import '../Pages/PopularActors.css';

const PopularActors = () => {
  const [loading, setLoading] = useState(true);
  const [actors, setActors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [loadingMore, setLoadingMore] = useState(false); // State for loading more actors

  useEffect(() => {
    // Clear actors data only when loading the first page
    if (currentPage === 1) {
      setActors([]);
    }
    fetchActors(currentPage);
  }, [currentPage]);

  const fetchActors = async (page) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/person/popular`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
          page: page,
        },
      });

      setActors((prevActors) => {
        // Filter out duplicates
        const newActors = response.data.results.filter(
          (newActor) => !prevActors.some((prevActor) => prevActor.id === newActor.id)
        );
        return [...prevActors, ...newActors];
      });

      if (page === 1) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    } catch (error) {
      console.error('Error fetching the popular actors:', error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

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

          <div className="more-container">
            {loadingMore ? (
              <CustomLoader />
            ) : (
              <button className="more-button" onClick={loadMore}>
                More Actors
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PopularActors;
