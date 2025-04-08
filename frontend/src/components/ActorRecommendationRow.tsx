import React, { useEffect, useState } from 'react';
import '../pages/Homepage.css';
import { fetchActorRecommendations } from '../api/RecommendAPI';
import { fetchMoviesByIds } from '../api/MoviesAPI';
import { ActorRec } from '../types/ActorRec';
import { Movie } from '../types/Movie';

const ActorRecommendationRow: React.FC = () => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [actorName, setActorName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const userId = 99; // 🔁 Replace this with dynamic value if you have user context... ***************** THIS SHOULD CHANGE WHEN WE HAVE USER'S LOGGED IN *******************

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const recs: ActorRec[] = await fetchActorRecommendations(userId);
        if (recs.length === 0) return;

        const showIds = recs.map((rec) => rec.recommendedShowId);
        const movies = await fetchMoviesByIds(showIds);

        setRecommendedMovies(movies);
        setActorName(recs[0].actorName); // all recs are from same top actor
      } catch (error) {
        console.error('Failed to load actor-based recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [userId]);

  if (loading) return <div>Loading actor recommendations...</div>;
  if (!actorName || recommendedMovies.length === 0) return null;

  return (
    <>
      <h2 className='section-title'>Because you like {actorName}:</h2>
      <div className='recommendation-wrapper'>
        <div className='recommendation-row'>
          {recommendedMovies.map((movie) => (
            <div key={movie.show_id} className='recommendation-card'>
              <img
                src={':) FIX THIS LATER SMH'} // ← update this once images are ready
                alt={movie.title}
                className='recommendation-image'
              />
              <p className='recommendation-title'>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ActorRecommendationRow;
