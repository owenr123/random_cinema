import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import MoviesPopular from "./Pages/MoviesPopular";
import MoviesNowPlaying from "./Pages/MoviesNowPlaying";
import MoviesComingSoon from "./Pages/MoviesComingSoon";
import TVSeriesPopular from "./Pages/TVSeriesPopular";
import TVSeriesTopRated from "./Pages/TVSeriesTopRated";
import TVSeriesNowPlaying from "./Pages/TVSeriesNowPlaying";
import Actors from "./Pages/Actors";
import About from "./Pages/About";
import MoviesDetails from "./Pages/MoviesDetails";
import TVSeriesDetails from "./Pages/TVSeriesDetails";
import ActorsDetails from "./Pages/ActorsDetails";
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/movies/popular" element={<MoviesPopular />} />
        <Route path="/movies/coming-soon" element={<MoviesComingSoon />} />
        <Route path="/movies/now-playing" element={<MoviesNowPlaying />} />
        <Route path="/tv-series/popular" element={<TVSeriesPopular />} />
        <Route path="/tv-series/top-rated" element={<TVSeriesTopRated />} />
        <Route path="/tv-series/now-playing" element={<TVSeriesNowPlaying />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/about" element={<About />} />
        <Route path="/movies/details/:id" element={<MoviesDetails />} />
        <Route path="/tv-series/details/:id" element={<TVSeriesDetails />} />
        <Route path="/actors/details/:id" element={<ActorsDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
