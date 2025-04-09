import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { Movie } from '../types/Movie';
import { fetchSuggestedMovies } from '../api/MoviesAPI';

const MoodBoardGrid: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchSuggestedMovies(6); // Change number as needed
        setMovies(data);
      } catch (error) {
        console.error('Error fetching moodboard movies:', error);
        setMovies([]);
      }
    };

    loadMovies();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; // Prevent infinite loop if fallback image also fails
    e.currentTarget.src = 'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Insidious.jpg';
  };

  return (
    <div className='moodboard-grid'>
      {movies.map((movie) => (
        <div key={movie.title} className='moodboard-card'>
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className='moodboard-image'
            onError={handleImageError}
          />
          <div className='moodboard-overlay'>
            <h3 className='moodboard-title'>{movie.title}</h3>
            <p className='moodboard-genre'>{movie.categoriesString}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoodBoardGrid;
