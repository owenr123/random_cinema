import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarLoader } from 'react-spinners';
import '../Styles/Actors.css';
import { Link } from 'react-router-dom';


const Actors = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [actors, setActors] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchActors();
  }, []);

  const fetchActors = async (pageNum = 1) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/person/popular`, {
        params: { api_key: process.env.REACT_APP_TMDB_API_KEY, page: pageNum },
      });

      if (pageNum === 1) {
        setActors(response.data.results.slice(0, 20));
        setLoading(false);
      } else {
        setActors((prevActors) => [...prevActors, ...response.data.results.slice(0, 20)]);
        setLoadingMore(false);
      }
    } catch (error) {
      console.error('Error fetching actors:', error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    setLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
    fetchActors(page + 1);
  };

  return (
    <div className="actors-container">
      {loading ? (
        <div className="loading-container">
          <BarLoader
            width={200}
            height={6}
            cssOverride={{
              background: 'linear-gradient(to right, #ff6b6b, #ffcc00)',
              borderRadius: '8px',
            }}
          />
        </div>
      ) : (
        <>
          <h1>The Actors</h1>
          <div className="actors-cards-row">
            {actors.map((actor) => (
               <Link to={`/actors/details/${actor.id}`} className="actors-custom-col" key={actor.id}>
                <div className="actors-cards">
                  <div className="actors-cards-img-container">
                    <img
                      src={`${process.env.REACT_APP_IMG_URL}${actor.profile_path}`}
                      className="actors-cards-img"
                      alt={actor.name}
                    />
                  </div>
                  <div className="actors-cards-body">
                    <h5 className="actors-cards-name">{actor.name}</h5>
                    <p className="actors-cards-text">
                      {actor.known_for.map((movie) => movie.title || movie.name).join(', ')}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Button More Actors */}
          <div className="more-container">
            {loadingMore ? (
              <div className="loading-container">
                <BarLoader
                  width={200}
                  height={6}
                  cssOverride={{
                    background: 'linear-gradient(to right, #ff6b6b, #ffcc00)',
                    borderRadius: '8px',
                  }}
                />
              </div>
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

export default Actors;
