import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { BarLoader } from 'react-spinners';
import 'react-circular-progressbar/dist/styles.css';
import '../Styles/TVSeriesDetails.css';
import Footer from "../Components/Footer";
import { Link } from 'react-router-dom';

const TVSeriesDetails = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/tv/${id}`,
          {
            params: {
              api_key: process.env.REACT_APP_TMDB_API_KEY,
              append_to_response: 'content_ratings,credits',
            },
          }
        );

        console.log('Series Data:', response.data);
        setSeries(response.data);
      } catch (error) {
        console.error('Error fetching series details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeriesDetails();
  }, [id]);

  const getRatingColor = (rating) => {
    if (rating >= 71) return '#4caf50';
    if (rating >= 41) return '#ffeb3b';
    return '#f44336';
  };

  const getReactionsFromRating = (rating) => {
    if (rating === 0) return [];
    if (rating >= 1 && rating <= 60) return ['👎', '🤮', '💩'];
    if (rating >= 61 && rating <= 70) return ['🤨', '😕', '😞'];
    if (rating >= 71 && rating <= 80) return ['👌', '😌', '🙂'];
    if (rating >= 81 && rating <= 100) return ['👍', '🔥', '🤩'];
    return [];
  };

  const getAgeRating = () => {
    const certifications = series?.content_ratings?.results.find((r) => r.iso_3166_1 === 'US')?.rating;
    return certifications || 'NR';
  };

  const userScore = series?.vote_average ? Math.round(series.vote_average * 10) : 0;
  const emojiReactions = getReactionsFromRating(userScore);

  return (
    <div className="seriesdetails-container">
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
          <div className="seriesdetails-header" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${series?.backdrop_path})` }}>
            <img
              src={`${process.env.REACT_APP_IMG_URL}${series?.poster_path}`}
              alt={series?.name}
              className="seriesdetails-poster"
            />
            <div className="seriesdetails-info">
              <h1>
                {series?.name} ({series?.first_air_date ? new Date(series.first_air_date).getFullYear() : 'N/A'})
              </h1>
              <p className="seriesdetails-meta">
                <span className="seriesdetails-rating-badge">{getAgeRating()}</span>
                {series?.first_air_date ? new Date(series.first_air_date).toLocaleDateString('en-US') : 'Date not available'}{' '}
                | {series?.genres ? series.genres.map((g) => g.name).join(', ') : 'Genre not available'} | {' '}
                {series?.number_of_seasons} Seasons
              </p>
              <div className="seriesdetails-rating">
                <div className="seriesdetails-rating-circle">
                  <CircularProgressbar
                    value={userScore}
                    text={`${userScore}%`}
                    styles={buildStyles({
                      textSize: '28px',
                      textColor: getRatingColor(userScore),
                      pathColor: getRatingColor(userScore),
                      trailColor: '#222',
                      backgroundColor: '#000',
                    })}
                  />
                </div>

                <div className="seriesdetails-reactions">
                  {emojiReactions.map((emoji, index) => (
                    <span key={index} className="seriesdetails-reaction">{emoji}</span>
                  ))}
                </div>
              </div>

              <div className="seriesdetails-description">
                <h2 className="seriesdetails-synopsis-title">About TV Series</h2>
                <p className="seriesdetails-overview">{series?.overview || 'Synopsis not available'}</p>

                {series?.created_by?.length > 0 && (
                  <div className="seriesdetails-creator">
                    <strong>Creator:</strong>{' '}
                    {series?.created_by?.length > 0
                      ? series.created_by.map((creator) => creator.name).join(', ')
                      : 'Creator not available'
                    }
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="seriesdetails-cast">
            <h2>Top Cast</h2>
            <div className="seriesdetails-cast-scroll">
              <div className="seriesdetails-cast-container">
              {series?.credits?.cast.length > 0 ? (
                series.credits.cast.slice(0, 10).map((actor) => (
                  <Link to={`/actors/details/${actor.id}`} key={actor.id} className="seriesdetails-cast-card">
                    <img
                      src={actor.profile_path ? `${process.env.REACT_APP_IMG_URL}${actor.profile_path}` : '/placeholder.jpg'}
                      alt={actor.name}
                      className="seriesdetails-cast-img"
                    />
                    <div className="seriesdetails-cast-body">
                      <p className="seriesdetails-cast-name">{actor.name}</p>
                      <p className="seriesdetails-cast-character">{actor.character || 'Unknown'}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="seriesdetails-cast-not-available">Cast not available</p>
              )}
              </div>
            </div>
          </div>

          <Footer />
        </>
      )}
    </div>
  );
};

export default TVSeriesDetails;
