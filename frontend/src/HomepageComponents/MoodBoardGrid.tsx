// src/components/MoodBoardGrid.tsx
import React from 'react';
import '/src/HomepageComplete/Homepage.CSS';

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
  return (
    <div className='moodboard-grid'>
      {moodBoardMovies.map((movie) => (
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
      ))}
    </div>
  );
};

export default MoodBoardGrid;
