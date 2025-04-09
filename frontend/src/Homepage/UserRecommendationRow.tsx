// src/components/UserRecommendationRow.tsx
import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { Movie } from '../types/Movie';
import { fetchCollabRecommendations } from '../api/RecommendAPI';
import { fetchMoviesByIds } from '../api/MoviesAPI';

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
              src={`https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/${movie.title}.jpg`}
            
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
