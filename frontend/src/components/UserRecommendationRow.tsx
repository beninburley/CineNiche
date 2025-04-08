import React, { useEffect, useState } from 'react';
import '../pages/Homepage.css';
import { fetchCollabRecommendations } from '../api/RecommendAPI';
import { fetchMoviesByIds } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';

const UserRecommendationRow: React.FC = () => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = 5; // 🔁 Replace this with dynamic value if you have user context... ***************** THIS SHOULD CHANGE WHEN WE HAVE USER'S LOGGED IN *******************

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const recs = await fetchCollabRecommendations(userId);
        const showIds = recs.map((rec) => rec.recommendedShowId);
        const movies = await fetchMoviesByIds(showIds);
        setRecommendedMovies(movies);
      } catch (error) {
        console.error('Failed to load recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [userId]);

  if (loading) return <div>Loading recommendations...</div>;

  return (
    <div className='recommendation-wrapper'>
      <div className='recommendation-row'>
        {recommendedMovies.map((movie) => (
          <div key={movie.show_id} className='recommendation-card'>
            <img
              src={':) FIX THIS LATER SMH'}
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
