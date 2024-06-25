import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CustomLoader from '../Components/CustomLoader';
import '../Components/HomePageHeroSection.css';


const TMDB_API_KEY = process.env.REACT_APP_TMDB_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const TMDB_IMG_URL = process.env.REACT_APP_IMG_URL.replace('/w500', '/original');

const HomepageHeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [genres, setGenres] = useState({});

  const imageRef = useRef(null);

  useEffect(() => {
    axios.all([
      axios.get(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`),
      axios.get(`${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`)
    ]).then(([moviesResponse, genresResponse]) => {
      const genresData = genresResponse.data.genres.reduce((acc, genre) => ({ ...acc, [genre.id]: genre.name }), {});
      setMovies(moviesResponse.data.results);
      setGenres(genresData);
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching data from TMDB:', error);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const interval = movies.length && setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % movies.length);
      setNextIndex(prevIndex => (prevIndex + 1) % movies.length);
    }, 59000);

    return () => clearInterval(interval);
  }, [movies.length]);

  useEffect(() => {
    if (movies.length && loaded) {
      setLoaded(false);
      imageRef.current.src = `${TMDB_IMG_URL}${movies[nextIndex].backdrop_path}`;
    }
  }, [currentIndex, nextIndex, movies]);

  const handleImageLoad = () => setLoaded(true);

  return (
    loading ? <CustomLoader /> : (
      <div className="homepage-hero" style={{ backgroundImage: `url(${TMDB_IMG_URL}${movies[currentIndex].backdrop_path})` }}>
        <img ref={imageRef} src={`${TMDB_IMG_URL}${movies[nextIndex].backdrop_path}`} alt="" onLoad={handleImageLoad} style={{ display: 'none' }} />
        <div className="homepage-overlay">
          <div className="homepage-hero-content">
            <h1 className="homepage-title">{movies[currentIndex].title}</h1>
            <p className="homepage-details">{`${movies[currentIndex].release_date.split('-')[0]} | ${movies[currentIndex].adult ? 'Rated R' : 'PG-13'} | ${movies[currentIndex].genre_ids.map(id => genres[id]).filter(Boolean).join(', ')}`}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default HomepageHeroSection;
