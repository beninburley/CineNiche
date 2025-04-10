import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { fetchDirectorRecommendations } from '../api/RecommendAPI';
import { fetchMoviesByIds } from '../api/MoviesAPI';
import { DirectorRec } from '../types/DirectorRec';
import { Movie } from '../types/Movie';
import { Link } from 'react-router-dom';

interface Props {
  userId: number;
}

const DirectorRecommendationRow: React.FC<Props> = ({ userId }) => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [directorName, setDirectorName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
                  src={`https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/${movie.title}.jpg`}
                  alt={movie.title}
                  className='recommendation-image'
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    const fallbackImages = [
                      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Open%20Season%202.jpg',
                      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Insidious.jpg',
                      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/12%20ROUND%20GUN.jpg',
                      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/17%20Again.jpg',
                      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Go%20Live%20Your%20Way.jpg',
                      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Judy%20Moody%20and%20the%20Not%20Bummer%20Summer.jpg',
                      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/No%20Strings%20Attached.jpg',
                      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Security.jpg',
                      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Seth%20Meyers%20Lobby%20Baby.jpg',
                      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/The%20Mayo%20Clinic.jpg',
                      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Limitless.jpg',
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
    </>
  );
};

export default DirectorRecommendationRow;
