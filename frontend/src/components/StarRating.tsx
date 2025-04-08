import { useState } from 'react';

const StarRating = ({ movieId }: { movieId: string }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const handleRating = async (newRating: number) => {
    setRating(newRating);
    await fetch(
      `https://214cinenichebackend-g8a5h7bqe5auc5hw.westus3-01.azurewebsites.net/movie/rate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId, rating: newRating }),
      }
    );
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: 'pointer',
            color: (hovered ?? rating) >= star ? 'gold' : 'gray',
            fontSize: '1.5rem',
          }}
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
