import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { fetchSuggestedMovies } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';
import { Link } from 'react-router-dom';

const HeroBanner: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const loadRandomMovie = async () => {
      try {
        const suggested = await fetchSuggestedMovies(1);
        setMovie(suggested[0]); // just take the first one
      } catch (error) {
        console.error('Failed to load random movie:', error);
      }
    };

    loadRandomMovie();
  }, []);

  if (!movie) {
    return (
      <section className='hero-banner'>
        <div className='hero-overlay'>
          <div className='hero-content'>
            <h1 className='hero-title'>Loading show...</h1>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className='hero-banner'
      style={{
        backgroundImage: `url(https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/${movie.title}.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='hero-overlay'>
        <div className='hero-content'>
          <h1 className='hero-title'>{movie.title}</h1>
          <p className='hero-description'>{movie.description}</p>
          <Link to={`/movie/${movie.show_id}`}>
            <button className='hero-button'>Watch Now</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
