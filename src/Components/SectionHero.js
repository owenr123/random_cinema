import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../Styles/SectionHero.css";
import { Link } from "react-router-dom";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const TMDB_IMG_URL = process.env.REACT_APP_IMG_URL.replace("/w500", "/original");

const SectionHero = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [genres, setGenres] = useState({});

  const imageRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, genresRes] = await Promise.all([
          axios.get(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`),
          axios.get(`${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`),
        ]);

        const genresData = genresRes.data.genres.reduce(
          (acc, genre) => ({ ...acc, [genre.id]: genre.name }),
          {}
        );

        setMovies(moviesRes.data.results);
        setGenres(genresData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
      setNextIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 10000); // 10 detik per slide

    return () => clearInterval(interval);
  }, [movies.length]);

  useEffect(() => {
    if (movies.length && loaded) {
      setLoaded(false);
      imageRef.current.src = `${TMDB_IMG_URL}${movies[nextIndex].backdrop_path}`;
    }
  }, [currentIndex, nextIndex, movies]);

  const handleImageLoad = () => setLoaded(true);

  if (loading || movies.length === 0) return null;

  const currentMovie = movies[currentIndex];
  const backgroundImage = currentMovie?.backdrop_path
    ? `${TMDB_IMG_URL}${currentMovie.backdrop_path}`
    : currentMovie?.poster_path
    ? `${TMDB_IMG_URL}${currentMovie.poster_path}`
    : "https://via.placeholder.com/1280x720?text=No+Image"; // Placeholder kalau tidak ada gambar

  return (
    <Link to={`/movies/details/${currentMovie.id}`} className="hero-link">
      <div
        className="hero-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <img
          ref={imageRef}
          src={`${TMDB_IMG_URL}${movies[nextIndex]?.backdrop_path}`}
          alt="Preload"
          onLoad={handleImageLoad}
          style={{ display: "none" }}
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">{currentMovie.title}</h1>
            <p className="hero-details">
              {new Date(currentMovie.release_date).getFullYear()} |{" "}
              {currentMovie.adult ? "Rated R" : "PG-13"} |{" "}
              {currentMovie.genre_ids.map((id) => genres[id]).filter(Boolean).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SectionHero;
