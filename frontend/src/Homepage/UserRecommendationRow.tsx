// src/components/UserRecommendationRow.tsx
import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { Movie } from '../types/Movie';
import { fetchCollabRecommendations } from '../api/RecommendAPI';
import { fetchMoviesByIds } from '../api/MoviesAPI';
import { Link } from 'react-router-dom';

interface Props {
  userId: number;
}

const UserRecommendationRow: React.FC<Props> = ({ userId }) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

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
          <Link to={`/movie/${movie.show_id}`} key={movie.show_id}>
            <div className='recommendation-card'>
              <img
                src={`https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/${movie.title}.jpg`}
                alt={movie.title}
                className='recommendation-image'
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  const fallbackImages = [
                    'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/The%20Innocence%20Files.jpg',
                    'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/My%20Amnesia%20Girl.jpg',
                    'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Paava%20Kadhaigal.jpg',
                    'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Cousins.jpg',
                    'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Man%20of%20Tai%20Chi.jpg',
                    'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/The%20Parisian%20Agency%20Exclusive%20Properties.jpg',
                  ];
                  const randomIndex = Math.floor(
                    Math.random() * fallbackImages.length
                  );
                  e.currentTarget.src = fallbackImages[randomIndex];
                }}
              />
              <p className='recommendation-title'>{movie.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserRecommendationRow;
