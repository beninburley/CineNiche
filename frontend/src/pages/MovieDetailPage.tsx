import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import StarRating from '../components/StarRating';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';
import Header from '../Homepage/Header';
import ContentRecommendationRow from '../Homepage/ContentRecommendation';

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
      <span>
        <Logout>
          Logout <AuthorizedUser value='email' />
        </Logout>
      </span>
      <div>
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        <p>Directed by: {movie.director}</p>
        <p>Cast: {movie.cast}</p>
        <p>Genres: {movie.categoriesString}</p>
        {/* ⭐ 5-star rating component */}
        <StarRating movieId={movie.show_id} />
      </div>
      <section className='section user-recommendations'>
        <h2 className='section-title'>Similar to {movie.title}</h2>
        <ContentRecommendationRow
          seedShowId={movie.show_id}
          seedShowTitle={movie.title}
        />
      </section>
    </AuthorizeView>
  );
};

export default MovieDetailPage;
