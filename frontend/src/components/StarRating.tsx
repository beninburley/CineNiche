import { useState } from 'react';

const StarRating = ({ movieId }: { movieId: string }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const handleRating = async (newRating: number) => {
    setRating(newRating);
    setMessage(''); // clear any existing message

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/movie/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ movieId, rating: newRating }),
      });

      if (res.ok) {
        setMessage('Rating submitted!');
      } else {
        setMessage('Failed to submit rating.');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred.');
    }
  };

  return (
    <div>
      <p style={{ marginBottom: '0.5rem' }}>
        <strong>Leave a rating:</strong>
      </p>
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
      {message && (
        <p style={{ marginTop: '0.5rem', color: 'green', fontSize: '0.9rem' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default StarRating;
