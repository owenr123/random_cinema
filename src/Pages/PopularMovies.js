import React, { useState, useEffect } from 'react';
import CustomLoader from '../Components/CustomLoader';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../Pages/MoviesCards.css';

const PopularMovies = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const [loadingMore, setLoadingMore] = useState(false); // State for loading more movies

  useEffect(() => {
    // Clear movies data only when loading the first page
    if (currentPage === 1) {
      setMovies([]);
    }
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = async (page) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/popular`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
          page: page,
        },
      });

      setMovies((prevMovies) => {
        // Filter out duplicates
        const newMovies = response.data.results.filter(
          (newMovie) => !prevMovies.some((prevMovie) => prevMovie.id === newMovie.id)
        );
        return [...prevMovies, ...newMovies];
      });

      if (page === 1) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    } catch (error) {
      console.error('Error fetching the popular movies:', error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const getRatingColor = (rating) => {
    if (rating >= 71) return '#4caf50'; // Green
    if (rating >= 41) return '#ffeb3b'; // Yellow
    return '#f44336'; // Red
  };

  return (
    <div className="movies-container mt-4">
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <h1 className="movies-title">Popular Movies</h1>
          
          <div className="movies-cards-row justify-content-center">
            {movies.map(movie => (
              <div className="movies-custom-col mb-4" key={movie.id}>
                <div className="movies-cards text-center" style={{ position: 'relative' }}>
                  <div className="movies-cards-img-container">
                    <img 
                      src={`${process.env.REACT_APP_IMG_URL}${movie.poster_path}`} 
                      className="movies-cards-img" 
                      alt={movie.title} 
                    />
                  </div>
                  <div style={{ width: 40, height: 40, position: 'absolute', top: 10, right: 10, backgroundColor: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                    <CircularProgressbar
                      value={Math.round(movie.vote_average * 10)}
                      text={`${Math.round(movie.vote_average * 10)}%`}
                      styles={buildStyles({
                        textSize: '32px',
                        textColor: getRatingColor(Math.round(movie.vote_average * 10)),
                        pathColor: getRatingColor(Math.round(movie.vote_average * 10)),
                        trailColor: '#aaa',
                        backgroundColor: '#222'
                      })}
                    />
                  </div>
                  <div className="movies-cards-body">
                    <h5 className="movies-cards-name">{movie.title}</h5>
                    <p className="movies-cards-text">{new Date(movie.release_date).toLocaleDateString('en-US', {
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric'
                    })}</p>
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
                More Movies
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PopularMovies;
