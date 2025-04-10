import React, { useEffect, useState } from 'react';
import { fetchHybridRecommendations } from '../api/RecommendAPI';
import { fetchMoviesByIds } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';
import { Link } from 'react-router-dom';
import { HybridRec } from '../types/HybridRec';
import './Homepage.css';

interface Props {
  seedShowId: string;
  userId: number;
  movieTitle: string;
}

const HybridRecommendationRow: React.FC<Props> = ({
  seedShowId,
  userId,
  movieTitle,
}) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const recs: HybridRec[] = await fetchHybridRecommendations(
          seedShowId,
          userId
        );
        if (recs.length === 0) return;

        const showIds = recs.map((rec) => rec.recommendedShowId);
        const movies = await fetchMoviesByIds(showIds);
        setRecommendedMovies(movies);
      } catch (error) {
        console.error('Failed to load hybrid recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [seedShowId, userId]);

  if (loading || recommendedMovies.length === 0) return null;

  return (
    <section className='section user-recommendations'>
      <h2 className='section-title'>Because you liked {movieTitle}</h2>
      <div className='recommendation-wrapper'>
        <div className='recommendation-row'>
          {recommendedMovies.map((movie) => (
            <Link key={movie.show_id} to={`/movie/${movie.show_id}`}>
              <div className='recommendation-card'>
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className='recommendation-image'
                />
                <p className='recommendation-title'>{movie.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HybridRecommendationRow;
