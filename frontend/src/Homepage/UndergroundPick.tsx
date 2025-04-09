import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { fetchMoviesByIds } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';
import { Link } from 'react-router-dom';

const UndergroundPick: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const loadUndergroundPick = async () => {
      try {
        const [fetchedMovie] = await fetchMoviesByIds(['s4706']);
        setMovie(fetchedMovie);
      } catch (error) {
        console.error('Failed to fetch underground pick movie:', error);
      }
    };

    loadUndergroundPick();
  }, []);

  if (!movie) {
    return <p>Loading Underground Pick...</p>;
  }

  return (
    <div className='underground-pick-card'>
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className='underground-image'
      />
      <div className='underground-info'>
        <h3 className='underground-title'>{movie.title}</h3>
        <p className='underground-director'>
          Directed by {movie.director || 'Unknown'}
        </p>
        <p className='underground-description'>{movie.description}</p>
        <Link to={`/movie/${movie.show_id}`}>
          <button className='underground-button'>Watch the Pick</button>
        </Link>
      </div>
    </div>
  );
};

export default UndergroundPick;
