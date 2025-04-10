import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { fetchContentRecommendations } from '../api/RecommendAPI';
import { fetchMoviesByIds } from '../api/MoviesAPI';
import { ContentRec } from '../types/ContentRec';
import { Movie } from '../types/Movie';
import { Link } from 'react-router-dom';

interface Props {
  seedShowId: string;
  seedShowTitle: string; // Used to display "Because you liked {title}"
}

const ContentRecommendationRow: React.FC<Props> = ({
  seedShowId,
  seedShowTitle,
}) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(seedShowTitle); //Not a solid fix but for some reason it needs done
  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const recs: ContentRec[] =
          await fetchContentRecommendations(seedShowId);
        if (recs.length === 0) return;

        const showIds = recs.map((rec) => rec.recommendedShowId);
        const movies = await fetchMoviesByIds(showIds);
        setRecommendedMovies(movies);
      } catch (error) {
        console.error('Failed to load content-based recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [seedShowId]);

  if (loading) return <div>Loading content-based recommendations...</div>;
  if (recommendedMovies.length === 0) return null;

  return (
    <>
      <div className='recommendation-wrapper'>
        <div className='recommendation-row'>
          {recommendedMovies.map((movie) => (
            <Link to={`/movie/${movie.show_id}`} key={movie.show_id}>
              <div className='recommendation-card'>
                <img
                  src={movie.posterUrl}
                  alt={`${movie.title} poster`}
                  className='movie-poster'
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Limitless.jpg'; // or any default fallback poster
                  }}
                />

                <p className='recommendation-title'>{movie.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContentRecommendationRow;
