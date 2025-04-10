import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import StarRating from '../components/StarRating';
import AuthorizeView, { UserContext } from '../components/AuthorizeView';
import Header from '../Homepage/Header';
import ContentRecommendationRow from '../Homepage/ContentRecommendation';
import HybridRecommendationRow from '../Homepage/HybridRecommendationRow';
import Footer from '../components/Footer';
import './MovieDetailPage.css';

// Movie detail page - Displays when you click on a movie
const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommenderId, setRecommenderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);
  const [hasHybridRecommendations, setHasHybridRecommendations] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await fetch(
          `${import.meta.env.VITE_API_URL}/movie/${id}`,
          {
            credentials: 'include',
          }
        );
        const movieData = await movieRes.json();
        setMovie(movieData);

        if (user?.email) {
          const recRes = await fetch(
            `${import.meta.env.VITE_API_URL}/movie/GetRecommenderId`,
            {
              credentials: 'include',
            }
          );
          if (!recRes.ok) throw new Error('Failed to get recommender ID');
          const recData = await recRes.json();
          setRecommenderId(recData.recommenderId);

          // Now test if the hybrid fetch works
          const hybridTestRes = await fetch(
            `${import.meta.env.VITE_API_URL}/recommendation/hybrid/${recData.recommenderId}/${movieData.show_id}`,
            {
              credentials: 'include',
            }
          );
          setHasHybridRecommendations(hybridTestRes.ok);
        }
      } catch (err) {
        console.error('Error loading movie or recommender data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, user?.email]);

  if (loading || !movie) return <p>Loading...</p>;

  return (
    <AuthorizeView>
      {' '}
      {/* Only authorized people can view the details of the movie */}
      <Header />
      <div className='movie-detail-wrapper'>
        <div className='movie-detail-box'>
          <div className='movie-detail-left'>
            <h1 className='movie-title'>{movie.title}</h1>
            <p className='movie-description'>{movie.description}</p>
            <p>
              <strong>Director:</strong> {movie.director}
            </p>
            <p>
              <strong>Cast:</strong> {movie.cast}
            </p>
            <p>
              <strong>Genres:</strong> {movie.categoriesString}
            </p>
            <StarRating movieId={movie.show_id} />{' '}
            {/* Star rating component shows the rating (if previously rated) and allows user to rate */}
          </div>
          <div className='movie-detail-right'>
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
          </div>
        </div>
      </div>
      {/* Show the hybrid recommender */}
      {hasHybridRecommendations && recommenderId && (
        <section className='section user-recommendations'>
          <div className='section-inner'>
            <HybridRecommendationRow
              seedShowId={movie.show_id}
              userId={recommenderId}
              movieTitle={movie.title}
            />
          </div>
        </section>
      )}
      <section className='section user-recommendations'>
        <div className='section-inner'>
          <h2 className='section-title'>Similar to {movie.title}</h2>
          {/* Content recommender */}
          <ContentRecommendationRow
            seedShowId={movie.show_id}
            seedShowTitle={movie.title}
          />
        </div>
      </section>
      <Footer />
    </AuthorizeView>
  );
};

export default MovieDetailPage;
