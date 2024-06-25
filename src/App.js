import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/HomePage';
import PopularMovies from './Pages/PopularMovies';
import ComingSoonMovies from './Pages/ComingSoonMovies';
import NowPlayingMovies from './Pages/NowPlayingMovies';
import About from './Pages/About';
import PopularTVSeries from './Pages/PopularTVSeries';
import TopRatedTVSeries from './Pages/TopRatedTVSeries';
import NowPlayingTVSeries from './Pages/NowPlayingTVSeries';
import PopularActors from './Pages/PopularActors';
import AppNavbar from './Components/Navbar';
import Footer from './Components/Footer';
import './App.css';

function App() {
  return (
    <Router>
        <AppNavbar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/movies/popular" element={<PopularMovies />} />
          <Route path="/movies/coming-soon" element={<ComingSoonMovies />} />
          <Route path="/movies/now-playing" element={<NowPlayingMovies />} />
          <Route path="/tv-series/popular" element={<PopularTVSeries />} />
          <Route path="/tv-series/top-rated" element={<TopRatedTVSeries />} />
          <Route path="/tv-series/now-playing" element={<NowPlayingTVSeries />} />
          <Route path="/actors/popular" element={<PopularActors />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
