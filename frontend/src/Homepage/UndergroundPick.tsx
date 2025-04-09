// src/components/UndergroundPick.tsx
import React from 'react';
import './Homepage.css';

// Placeholder mock data
const undergroundPick = {
  title: 'Guernsey Literary and Potato Peel Pie Society',
  imageUrl: '/public/img/undergound.jpg',

  description:
    'In the aftermath of World War II, a writer forms an unexpected bond with the residents of Guernsey Island when she decides to write a book about their experiences during the war. Then she learns the secret they are afraid to reveal.',
  director: 'Mike Newell',
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
