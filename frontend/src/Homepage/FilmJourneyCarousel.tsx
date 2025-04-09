import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { Movie } from '../types/Movie';
import { fetchSuggestedMovies } from '../api/MoviesAPI';

const FilmJourneyCarousel: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchSuggestedMovies(6); // adjust count as needed
        setMovies(data);
      } catch (error) {
        console.error('Error fetching film journeys:', error);
        setMovies([]);
      }
    };

    loadMovies();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = 'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Insidious.jpg';
  };

  return (
    <div className='carousel-wrapper'>
      <div className='carousel'>
        {movies.map((movie) => (
          <div key={movie.title} className='carousel-card'>
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className='carousel-image'
              onError={handleImageError}
            />
            <div className='carousel-info'>
              <h3 className='carousel-title'>{movie.title}</h3>
              <p className='carousel-description'>
                {movie.description || 'A unique cinematic journey.'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmJourneyCarousel;
