// src/components/UserRecommendationRow.tsx
import React from 'react';
import '/src/HomepageComplete/Homepage.CSS';

// Mock data
const recommendedMovies = [
  {
    id: 1,
    title: 'Shadows in Berlin',
    imageUrl: '/images/reco1.jpg',
  },
  {
    id: 2,
    title: 'The Color of Forgetting',
    imageUrl: '/images/reco2.jpg',
  },
  {
    id: 3,
    title: 'Celestial Silence',
    imageUrl: '/images/reco3.jpg',
  },
  {
    id: 4,
    title: 'Nostalgia Café',
    imageUrl: '/images/reco4.jpg',
  },
  {
    id: 5,
    title: 'Whispers of Clay',
    imageUrl: '/images/reco5.jpg',
  },
];

const UserRecommendationRow: React.FC = () => {
  return (
    <div className='recommendation-wrapper'>
      <div className='recommendation-row'>
        {recommendedMovies.map((movie) => (
          <div key={movie.id} className='recommendation-card'>
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className='recommendation-image'
            />
            <p className='recommendation-title'>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRecommendationRow;
