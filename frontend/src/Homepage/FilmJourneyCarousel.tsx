import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { Movie } from '../types/Movie';
import { fetchSuggestedMovies } from '../api/MoviesAPI';
import { Link } from 'react-router-dom';

// Mock data
const journeys = [
  {
    id: 1,
    title: 'Love in Translation',
    imageUrl: '/images/journey1.jpg',
    description: 'Romance across language, culture, and distance.',
  },
  {
    id: 2,
    title: 'Feminist Film Front',
    imageUrl: '/images/journey2.jpg',
    description: 'Groundbreaking cinema from visionary women directors.',
  },
  {
    id: 3,
    title: 'The Reality Bend',
    imageUrl: '/images/journey3.jpg',
    description: 'When stories fracture and truth becomes fluid.',
  },
  {
    id: 4,
    title: 'Silent Cinema Revival',
    imageUrl: '/images/journey4.jpg',
    description: 'Rediscovered classics from the silent era.',
  },
];

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
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/USS%20Indianapolis%20Men%20of%20Courage.jpg',
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Main%20Meri%20Patni%20Aur%20Woh.jpg',
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/DreamWorks%20Spooky%20Stories%20Volume%202.jpg',
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/The%20Royal%20Bengal%20Tiger.jpg',
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Caregiver.jpg',
    ];

    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    e.currentTarget.src = fallbackImages[randomIndex];
  };

  return (
    <div className='carousel-wrapper'>
      <div className='carousel'>
        {journeys.map((journey) => (
          <Link to={`/movie/${journey.id}`}>
            <div key={journey.id} className='carousel-card'>
              <img
                src={journey.imageUrl}
                alt={journey.title}
                className='carousel-image'
              />
              <div className='carousel-info'>
                <h3 className='carousel-title'>{journey.title}</h3>
                <p className='carousel-description'>{journey.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilmJourneyCarousel;
