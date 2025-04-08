// src/components/FilmJourneyCarousel.tsx
import React from 'react';
import './Homepage.css';

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
  return (
    <div className='carousel-wrapper'>
      <div className='carousel'>
        {journeys.map((journey) => (
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
        ))}
      </div>
    </div>
  );
};

export default FilmJourneyCarousel;
