import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { BarLoader } from 'react-spinners';
import 'react-circular-progressbar/dist/styles.css';
import '../Styles/MoviesDetails.css';
import Footer from "../Components/Footer";
import { Link } from 'react-router-dom';

const MoviesDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/movie/${id}`,
          {
            params: {
              api_key: process.env.REACT_APP_TMDB_API_KEY,
              append_to_response: 'release_dates,credits',
            },
          }
        );

        console.log('Movie Data:', response.data);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const getRatingColor = (rating) => {
    if (rating >= 71) return '#4caf50';
    if (rating >= 41) return '#ffeb3b';
    return '#f44336';
  };

  const getReactionsFromRating = (rating) => {
    if (rating === 0) return [];
    if (rating >= 1 && rating <= 60) return ['👎', '🤮', '💩']; // Sampah
    if (rating >= 61 && rating <= 70) return ['🤨', '😕', '😞']; // Kurang
    if (rating >= 71 && rating <= 80) return ['👌', '😌', '🙂']; // Medioker
    if (rating >= 81 && rating <= 100) return ['👍', '🔥', '🤩']; // Terbaik, bagus
    return [];
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getAgeRating = () => {
    const certifications = movie?.release_dates?.results.find((r) => r.iso_3166_1 === 'US')?.release_dates || [];
    const rating = certifications.find((cert) => cert.certification)?.certification;
    return rating || 'NR';
  };

  const userScore = movie?.vote_average ? Math.round(movie.vote_average * 10) : 0;
  const emojiReactions = getReactionsFromRating(userScore);

  return (
    <div className="moviesdetails-container">
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
          <div className="moviesdetails-header" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})` }}>
            <img
              src={`${process.env.REACT_APP_IMG_URL}${movie?.poster_path}`}
              alt={movie?.title}
              className="moviesdetails-poster"
            />
            <div className="moviesdetails-info">
              <h1>
                {movie?.title} ({movie?.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'})
              </h1>
              <p className="moviesdetails-meta">
                <span className="moviesdetails-rating-badge">{getAgeRating()}</span>
                {movie?.release_date ? new Date(movie.release_date).toLocaleDateString('en-US') : 'Date not available'}{' '}
                (US) | {movie?.genres ? movie.genres.map((g) => g.name).join(', ') : 'Genre not available'} | {' '}
                {movie?.runtime ? formatRuntime(movie.runtime) : 'Duration not available'}
              </p>
              <div className="moviesdetails-rating">
                <div className="moviesdetails-rating-circle">
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

                {/* Emoji Reactions */}
                <div className="moviesdetails-reactions">
                  {emojiReactions.map((emoji, index) => (
                    <span key={index} className="moviesdetails-reaction">{emoji}</span>
                  ))}
                </div>
              </div>

              {/* Short Synopsis */}
              <div className="moviesdetails-description">
                <h2 className="moviesdetails-synopsis-title">About Movies</h2>
                <p className="moviesdetails-overview">{movie?.overview || 'Synopsis not available'}</p>

                {/* Director */}
                {movie?.credits?.crew.find((person) => person.job === 'Director') && (
                  <div className="moviesdetails-director">
                    <strong>Director:</strong>{' '}
                    {movie?.credits?.crew.filter((person) => person.job === 'Director').length > 0
                    ? movie.credits.crew
                      .filter((person) => person.job === 'Director')
                      .map((director) => director.name)
                      .join(', ')
                    : 'Director not available'}
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className="moviesdetails-cast">
            <h2>Top Cast</h2>
            <div className="moviesdetails-cast-scroll">
              <div className="moviesdetails-cast-container">
                {movie?.credits?.cast.length > 0 ? (
                movie.credits.cast.slice(0, 10).map((actor) => (
                  <Link to={`/actors/details/${actor.id}`} key={actor.id} className="moviesdetails-cast-card">
                    <img
                      src={actor.profile_path ? `${process.env.REACT_APP_IMG_URL}${actor.profile_path}` : '/placeholder.jpg'}
                      alt={actor.name}
                      className="moviesdetails-cast-img"
                    />
                    <div className="moviesdetails-cast-body">
                      <p className="moviesdetails-cast-name">{actor.name}</p>
                      <p className="moviesdetails-cast-character">{actor.character || 'Unknown'}</p>
                    </div>
                  </Link>
                ))
                ) : (
                <p className="moviesdetails-cast-not-available">Cast not available</p>
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

export default MoviesDetails;
