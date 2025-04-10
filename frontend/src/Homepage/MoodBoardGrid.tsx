import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { Movie } from '../types/Movie';
import { fetchSuggestedMovies } from '../api/MoviesAPI';
import { Link } from 'react-router-dom';

const MoodBoardGrid: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchSuggestedMovies(5); // Change number as needed
        setMovies(data);
      } catch (error) {
        console.error('Error fetching moodboard movies:', error);
        setMovies([]);
      }
    };

    loadMovies();
  }, []);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.onerror = null; // Prevent infinite loop

    const fallbackImages = [
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Insidious.jpg',
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/12%20ROUND%20GUN.jpg',
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/17%20Again.jpg',
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/6%20Balloons.jpg',
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/6%20Underground.jpg',
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/6%20Years.jpg',
    ];

    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    e.currentTarget.src = fallbackImages[randomIndex];
  };

  return (
    <div className='moodboard-grid'>
      {movies.map((movie) => (
        <Link to={`/movie/${movie.show_id}`} key={movie.title}>
          <div className='moodboard-card'>
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
        </Link>
      ))}
    </div>
  );
};

export default MoodBoardGrid;
