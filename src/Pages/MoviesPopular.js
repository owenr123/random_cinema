import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarLoader } from 'react-spinners';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../Styles/Movies.css';
import { Link } from 'react-router-dom';

const PopularMovies = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (currentPage === 1) {
      setMovies([]);
    }
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = async (page) => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/popular`, {
        params: { api_key: process.env.REACT_APP_TMDB_API_KEY, page },
      });

      setMovies((prevMovies) => {
        const newMovies = response.data.results.filter(
          (newMovie) => !prevMovies.some((prevMovie) => prevMovie.id === newMovie.id)
        );
        return [...prevMovies, ...newMovies];
      });

      setTimeout(() => {
        setLoading(false);
        setLoadingMore(false);
      }, 1000); // Loading minimal 2 detik

    } catch (error) {
      console.error('Error fetching the popular movies:', error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => setCurrentPage((prevPage) => prevPage + 1);

  const getRatingColor = (rating) => {
    if (rating >= 71) return '#4caf50';
    if (rating >= 41) return '#ffeb3b';
    return '#f44336';
  };

  return (
    <div className="movies-container">
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
          <h1>Popular Movies</h1>

          <div className="movies-cards-row">
            {movies.map((movie) => (
              <Link to={`/movies/details/${movie.id}`} className="movies-custom-col" key={movie.id}>
                <div className="movies-cards">
                  <div className="movies-cards-img-container">
                    <img
                      src={`${process.env.REACT_APP_IMG_URL}${movie.poster_path}`}
                      className="movies-cards-img"
                      alt={movie.title}
                    />
                    {/* Rating selalu muncul */}
                    <div className="movies-rating">
                      <CircularProgressbar
                        value={Math.round(movie.vote_average * 10)}
                        text={`${Math.round(movie.vote_average * 10)}%`}
                        styles={buildStyles({
                          textSize: '28px',
                          textColor: getRatingColor(Math.round(movie.vote_average * 10)),
                          pathColor: getRatingColor(Math.round(movie.vote_average * 10)),
                          trailColor: '#aaa',
                        })}
                      />
                    </div>
                  </div>
                  <div className="movies-cards-body">
                    <h5 className="movies-cards-name">{movie.title}</h5>
                    <p className="movies-cards-text">
                      {new Date(movie.release_date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

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
