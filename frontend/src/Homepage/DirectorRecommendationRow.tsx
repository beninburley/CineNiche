import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { fetchDirectorRecommendations } from '../api/RecommendAPI';
import { fetchMoviesByIds } from '../api/MoviesAPI';
import { DirectorRec } from '../types/DirectorRec';
import { Movie } from '../types/Movie';
import { Link } from 'react-router-dom';

const DirectorRecommendationRow: React.FC = () => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [directorName, setDirectorName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const userId = 99; // 🔁 Replace with dynamic user ID once authentication is wired up

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const recs: DirectorRec[] = await fetchDirectorRecommendations(userId);
        if (recs.length === 0) return;

        const showIds = recs.map((rec) => rec.recommendedShowId);
        const movies = await fetchMoviesByIds(showIds);

        setRecommendedMovies(movies);
        setDirectorName(recs[0].directorName); // assumes all recs come from the top director
      } catch (error) {
        console.error('Failed to load director-based recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [userId]);

  if (loading) return <div>Loading director recommendations...</div>;
  if (!directorName || recommendedMovies.length === 0) return null;

  return (
    <>
      <h2 className='section-title'>
        Because you like director {directorName}:
      </h2>
      <div className='recommendation-wrapper'>
        <div className='recommendation-row'>
          {recommendedMovies.map((movie) => (
            <Link to={`/movie/${movie.show_id}`}>
              <div key={movie.show_id} className='recommendation-card'>
                <img
                  src={':) FIX THIS LATER SMH'} // Update this once your image URL logic is set
                  alt={movie.title}
                  className='recommendation-image'
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

export default DirectorRecommendationRow;
