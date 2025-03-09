import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarLoader } from 'react-spinners';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../Styles/TVSeries.css';
import { Link } from 'react-router-dom';

const TVSeriesPopular = () => {
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (currentPage === 1) {
      setSeries([]);
    }
    fetchSeries(currentPage);
  }, [currentPage]);

  const fetchSeries = async (page) => {
    try {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/tv/on_the_air`, {
        params: { api_key: process.env.REACT_APP_TMDB_API_KEY, page },
      });

      setSeries((prevSeries) => {
        const newSeries = response.data.results.filter(
          (newShow) => !prevSeries.some((prevShow) => prevShow.id === newShow.id)
        );
        return [...prevSeries, ...newSeries];
      });

      setTimeout(() => {
        setLoading(false);
        setLoadingMore(false);
      }, 1000);

    } catch (error) {
      console.error('Error fetching popular TV series:', error);
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
    <div className="series-container">
      {loading ? (
        <div className="loading-container">
            <BarLoader width={200} height={6} 
                cssOverride={{
                background: 'linear-gradient(to right, #ff6b6b, #ffcc00)',
                borderRadius: '8px',
                }} 
            />
        </div>
      ) : (
        <>
          <h1>Now Playing TV Series</h1>

          <div className="series-cards-row">
            {series.map((show) => (
              <Link to={`/tv-series/details/${show.id}`} className="series-custom-col" key={show.id}>
                <div className="series-cards">
                  <div className="series-cards-img-container">
                    <img
                      src={`${process.env.REACT_APP_IMG_URL}${show.poster_path}`}
                      className="series-cards-img"
                      alt={show.name}
                    />
                    <div className="series-rating">
                      <CircularProgressbar
                        value={Math.round(show.vote_average * 10)}
                        text={`${Math.round(show.vote_average * 10)}%`}
                        styles={buildStyles({
                          textSize: '28px',
                          textColor: getRatingColor(Math.round(show.vote_average * 10)),
                          pathColor: getRatingColor(Math.round(show.vote_average * 10)),
                          trailColor: '#aaa',
                        })}
                      />
                    </div>
                  </div>
                  <div className="series-cards-body">
                    <h5 className="series-cards-name">{show.name}</h5>
                    <p className="series-cards-text">
                      {new Date(show.first_air_date).toLocaleDateString('en-US', {
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
                <BarLoader width={200} height={6} 
                    cssOverride={{
                    background: 'linear-gradient(to right, #ff6b6b, #ffcc00)',
                    borderRadius: '8px',
                    }}
                />
              </div>
            ) : (
              <button className="more-button" onClick={loadMore}>
                More TV Series
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TVSeriesPopular;
