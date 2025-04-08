// src/components/ReviewHighlight.tsx
import React from 'react';
import '../pages/Homepage.css';

// Mock review
const review = {
  movieTitle: 'Letters from the Edge',
  reviewer: 'Lena P.',
  quote:
    '“This film lingers in your bones. Raw, poetic, and painfully honest—it reminds me why I fell in love with cinema in the first place.”',
  avatarUrl: '/images/user-lena.jpg', // Optional profile image
};

const ReviewHighlight: React.FC = () => {
  return (
    <div className='review-highlight-card'>
      <div className='reviewer-info'>
        <img
          src={review.avatarUrl}
          alt={review.reviewer}
          className='reviewer-avatar'
        />
        <div>
          <p className='reviewer-name'>{review.reviewer}</p>
          <p className='reviewer-movie'>
            on <em>{review.movieTitle}</em>
          </p>
        </div>
      </div>
      <blockquote className='review-quote'>{review.quote}</blockquote>
    </div>
  );
};

export default ReviewHighlight;
