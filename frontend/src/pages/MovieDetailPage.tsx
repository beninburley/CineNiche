import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import StarRating from '../components/StarRating';
import AuthorizeView from '../components/AuthorizeView';
import Header from '../Homepage/Header';
import ContentRecommendationRow from '../Homepage/ContentRecommendation';

import './MovieDetailPage.css'; // Make sure this is imported!
import Footer from '../components/Footer';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/movie/${id}`, {
        credentials: 'include',
      });
      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <AuthorizeView>
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
            <StarRating movieId={movie.show_id} />
          </div>

          <div className='movie-detail-right'>
            <img
              src={movie.posterUrl}
              alt={`${movie.title} poster`}
              className='movie-poster'
            />
          </div>
        </div>
      </div>
      <section className='section user-recommendations'>
        <div className='section-inner'>
          <h2 className='section-title'>Similar to {movie.title}</h2>
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
