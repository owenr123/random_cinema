import React, { useState, useEffect } from 'react';
import CustomLoader from '../Components/CustomLoader';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../Pages/TVSeriesCards.css';

const NowPlayingSeries = () => {
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
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/tv/on_the_air`, {
        params: {
          api_key: process.env.REACT_APP_TMDB_KEY,
          page: page,
        },
      });

      setSeries((prevSeries) => {
        const newSeries = response.data.results.filter(
          (newSeries) => !prevSeries.some((prevSeries) => prevSeries.id === newSeries.id)
        );
        return [...prevSeries, ...newSeries];
      });

      if (page === 1) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    } catch (error) {
      console.error('Error fetching the now playing series:', error);
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const getRatingColor = (rating) => {
    if (rating >= 71) return '#4caf50';
    if (rating >= 41) return '#ffeb3b';
    return '#f44336';
  };

  return (
    <div className="series-container mt-4">
      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <h1 className="series-title">Now Playing Series</h1>
          
          <div className="series-cards-row justify-content-center">
            {series.map(series => (
              <div className="series-custom-col mb-4" key={series.id}>
                <div className="series-cards text-center" style={{ position: 'relative' }}>
                  <div className="series-cards-img-container">
                    <img 
                      src={`${process.env.REACT_APP_IMG_URL}${series.poster_path}`} 
                      className="series-cards-img" 
                      alt={series.name} 
                    />
                  </div>
                  <div style={{ width: 40, height: 40, position: 'absolute', top: 10, right: 10, backgroundColor: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                    <CircularProgressbar
                      value={Math.round(series.vote_average * 10)}
                      text={`${Math.round(series.vote_average * 10)}%`}
                      styles={buildStyles({
                        textSize: '32px',
                        textColor: getRatingColor(Math.round(series.vote_average * 10)),
                        pathColor: getRatingColor(Math.round(series.vote_average * 10)),
                        trailColor: '#aaa',
                        backgroundColor: '#222'
                      })}
                    />
                  </div>
                  <div className="series-cards-body">
                    <h5 className="series-cards-name">{series.name}</h5>
                    <p className="series-cards-text">{new Date(series.first_air_date).toLocaleDateString('en-US', {
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
                More series
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NowPlayingSeries;
