import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { Movie } from '../types/Movie';
import { fetchSuggestedMovies } from '../api/MoviesAPI';
import { Link } from 'react-router-dom';

// Mock data for now
const moodBoardMovies = [
  {
    id: 1,
    title: 'Monsoon Cinema',
    genre: 'Foreign Drama',
    imageUrl: '/images/mood1.jpg',
  },
  {
    id: 2,
    title: 'The Velvet Static',
    genre: 'Experimental',
    imageUrl: '/images/mood2.jpg',
  },
  {
    id: 3,
    title: 'Blue Noise',
    genre: 'Indie Sci-Fi',
    imageUrl: '/images/mood3.jpg',
  },
  {
    id: 4,
    title: 'Daughter of the Dust',
    genre: 'Historical Fiction',
    imageUrl: '/images/mood4.jpg',
  },
];

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
      {moodBoardMovies.map((movie) => (
        <Link to={`/movie/${movie.id}`}>
          <div key={movie.id} className='moodboard-card'>
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className='moodboard-image'
            />
            <div className='moodboard-overlay'>
              <h3 className='moodboard-title'>{movie.title}</h3>
              <p className='moodboard-genre'>{movie.genre}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MoodBoardGrid;
