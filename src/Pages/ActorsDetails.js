import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BarLoader } from 'react-spinners';
import '../Styles/ActorsDetails.css';
import Footer from "../Components/Footer";
import { Link } from 'react-router-dom';

const ActorDetails = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/person/${id}`,
          {
            params: {
              api_key: process.env.REACT_APP_TMDB_API_KEY,
              append_to_response: 'combined_credits',
            },
          }
        );

        console.log('Actor Data:', response.data);
        setActor(response.data);
      } catch (error) {
        console.error('Error fetching actor details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActorDetails();
  }, [id]);

  const getAge = (birthDate) => {
    if (!birthDate) return "N/A";
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return `${currentYear - birthYear} y.o`;
  };

  const shortBio = actor?.biography?.slice(0, 250) + "...";

  return (
    <div className="actorsdetails-container">
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
          <div className="actorsdetails-header">
            <img
              src={`${process.env.REACT_APP_IMG_URL}${actor?.profile_path}`}
              alt={actor?.name}
              className="actorsdetails-poster"
            />

            <div className="actorsdetails-info">
              <h1>{actor?.name}</h1>
              <p className="actorsdetails-meta">
                {actor?.birthday ? new Date(actor.birthday).toLocaleDateString('en-US', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                  }) : 'Unknown'
                } | 
                {' '} {getAge(actor?.birthday)} |
                {' '} {actor?.gender === 1 ? 'Female' : 'Male'}
              </p>
              <div className="actorsdetails-description">
                <h2 className="actorsdetails-bio-title">Biography</h2>
                <p className="actorsdetails-overview">
                  {showFullBio ? actor?.biography : shortBio}
                  {actor?.biography && actor.biography.length > 250 && (
                    <button 
                      onClick={() => setShowFullBio(!showFullBio)}
                      className="read-more-btn"
                    >
                      {showFullBio ? "Hide" : "Read More"}
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="actorsdetails-roles">
            <h2>Roles</h2>
            <div className="actorsdetails-roles-scroll">
              <div className="actorsdetails-roles-container">
                {actor?.combined_credits?.cast.length > 0 ? (
                  actor.combined_credits.cast
                    .filter(movie => movie.media_type === 'movie')
                    .sort((a, b) => b.popularity - a.popularity)
                    .slice(0, 10)
                    .map((movie) => (
                      <Link to={`/movies/details/${movie.id}`} key={movie.id} className="actorsdetails-roles-card">
                        <img
                          src={movie.poster_path ? `${process.env.REACT_APP_IMG_URL}${movie.poster_path}` : '/placeholder.jpg'}
                          alt={movie.title}
                          className="actorsdetails-roles-img"
                        />
                        <div className="actorsdetails-roles-body">
                          <p className="actorsdetails-roles-name">{movie.title}</p>
                          <p className="actorsdetails-roles-year">{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</p>
                        </div>
                      </Link>
                    ))
                ) : (
                  <p className="actorsdetails-no-roles">No roles available</p>
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

export default ActorDetails;
