import { useState, useEffect } from 'react';

const StarRating = ({ movieId }: { movieId: string }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setRating(0); // Clear old rating
    setMessage(''); // Clear old message
    setHovered(null); // Reset hover
  }, [movieId]);

  // Load the current user's rating for this movie
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/movie/rating/${movieId}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (res.ok) {
          const data = await res.json();
          if (data.rating) {
            setRating(data.rating);
          }
        }
      } catch (err) {
        console.error('Failed to load user rating:', err);
      }
    };

    fetchRating();
  }, [movieId]);

  const handleRating = async (newRating: number) => {
    setRating(newRating);
    setMessage('');

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

  // when there is a rating, the stars populate. if not, the user can still leave a rating that adds to the DB
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
