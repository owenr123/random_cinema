import React, { useState, useEffect, useRef } from 'react';
import '../Components/HomePageTrailerSection.css';
import CustomLoader from '../Components/CustomLoader';
import axios from 'axios';
import { FaPlayCircle, FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';

const TMDB_API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const TMDB_IMG_URL = process.env.REACT_APP_IMG_URL.replace('/w500', '/original');
const TMDB_TRAILER_URL = (movieId) => `${BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`;

const HomepageTrailerSection = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);
  const [genres, setGenres] = useState({}); // Tambahkan definisi genres
  const [backgroundImage, setBackgroundImage] = useState(''); // State untuk menyimpan background image

  const imageRef = useRef(null);

  useEffect(() => {
    axios.all([
      axios.get(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`),
      axios.get(`${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`)
    ])
      .then(([moviesResponse, genresResponse]) => {
        const genresData = genresResponse.data.genres.reduce((acc, genre) => ({ ...acc, [genre.id]: genre.name }), {});
        setMovies(moviesResponse.data.results);
        setGenres(genresData); // Set genres di sini
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data from TMDB:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (movies.length) {
      const fetchTrailers = async () => {
        try {
          const trailerPromises = movies.map(movie => axios.get(TMDB_TRAILER_URL(movie.id)));
          const trailerResponses = await Promise.all(trailerPromises);
          const trailerData = trailerResponses.map((response, index) => {
            const trailer = response.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            return trailer ? { movieId: movies[index].id, key: trailer.key, imageUrl: `${TMDB_IMG_URL}${movies[index].backdrop_path}` } : null;
          }).filter(Boolean);
          setTrailers(trailerData);
        } catch (error) {
          console.error('Error fetching trailers:', error);
        }
      };

      fetchTrailers();
    }
  }, [movies]);

  const openModal = (trailer) => {
    setCurrentTrailer(trailer);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentTrailer(null);
  };

  const handleImageLoad = (imageUrl) => {
    setBackgroundImage(imageUrl);
  };

  return (
    loading ? <CustomLoader /> : (
      <div className="homepage-trailer-section bg-dark" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="sticky-header-wrapper">
          <h2>Latest Trailers</h2>
        </div>
        <div className="homepage-trailer-scroll">
          <div className="homepage-trailer-container">
            {trailers.map(trailer => {
              const movie = movies.find(m => m.id === trailer.movieId);
              return (
                <div
                  key={trailer.movieId}
                  className="homepage-trailer-card"
                  onMouseEnter={() => handleImageLoad(trailer.imageUrl)}
                  onClick={() => openModal(trailer)}
                >
                  <img src={trailer.imageUrl} alt={movie?.title} className="trailer-image" />
                  <FaPlayCircle className="play-icon" />
                  <div className="homepage-trailer-card-title">{movie?.title}</div>
                </div>
              );
            })}
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Trailer Modal"
          className="trailer-modal"
          overlayClassName="trailer-modal-overlay"
        >
          <FaTimes className="close-modal" onClick={closeModal} />
          {currentTrailer && (
            <div className="trailer-video-container">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentTrailer.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </Modal>
      </div>
    )
  );
};

export default HomepageTrailerSection;
