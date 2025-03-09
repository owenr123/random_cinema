import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/SectionTagline.css";

const TMDB_IMG_URL = process.env.REACT_APP_IMG_URL.replace("/w500", "/original");

const SectionTagline = () => {
  const [taglines, setTaglines] = useState([]);
  const placeholderImage = "https://via.placeholder.com/1280x720?text=No+Image";

  useEffect(() => {
    const fetchTaglines = async () => {
      try {
        const years = [1994, 2008, 2010, 2015, 2023]; // Rentang tahun untuk variasi film
        const selectedYear = years[Math.floor(Math.random() * years.length)]; // Ambil random tahun

        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&primary_release_year=${selectedYear}&sort_by=popularity.desc&include_adult=false&certification_country=US&certification.lte=R`
        );

        const movies = response.data.results.slice(0, 12); // Ambil 12 film untuk dipilih secara random
        const randomMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 4); // Pilih 4 film acak

        const formattedTaglines = await Promise.all(
          randomMovies.map(async (movie) => {
            const movieDetails = await axios.get(
              `${process.env.REACT_APP_BASE_URL}/movie/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
            );

            return {
              id: movie.id,
              tagline: movieDetails.data.tagline || "No tagline available",
              title: movie.title,
              backdrop: movieDetails.data.backdrop_path
                ? `${TMDB_IMG_URL}${movieDetails.data.backdrop_path}`
                : placeholderImage,
            };
          })
        );

        setTaglines(formattedTaglines);
      } catch (error) {
        console.error("Error fetching taglines:", error);
      }
    };

    fetchTaglines();
  }, []);

  return (
    <div className="tagline-container">
      {taglines.map((movie) => (
        <div key={movie.id} className="tagline-card">
          <div
            className="tagline-background"
            style={{ backgroundImage: `url(${movie.backdrop})` }}
          ></div>
          <div className="tagline-content">
            <p className="tagline-text">"{movie.tagline}"</p>
            <p className="tagline-title">{movie.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionTagline;
