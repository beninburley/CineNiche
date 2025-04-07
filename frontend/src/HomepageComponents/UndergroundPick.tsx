// src/components/UndergroundPick.tsx
import React from 'react';
import '/src/HomepageComplete/Homepage.CSS';

// Placeholder mock data
const undergroundPick = {
  title: 'Mirrors of Dust',
  imageUrl: '/images/underground.jpg',
  description:
    'An unreleased short from 1982 that explores memory through decaying Super 8 footage. Haunting, beautiful, and almost lost to time.',
  director: 'Sofia El-Mir',
};

const UndergroundPick: React.FC = () => {
  return (
    <div className='underground-pick-card'>
      <img
        src={undergroundPick.imageUrl}
        alt={undergroundPick.title}
        className='underground-image'
      />
      <div className='underground-info'>
        <h3 className='underground-title'>{undergroundPick.title}</h3>
        <p className='underground-director'>
          Directed by {undergroundPick.director}
        </p>
        <p className='underground-description'>{undergroundPick.description}</p>
        <button className='underground-button'>Watch the Pick</button>
      </div>
    </div>
  );
};

export default UndergroundPick;
