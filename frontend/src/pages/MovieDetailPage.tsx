import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import StarRating from '../components/StarRating';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';

// This page is created when someone clicks on a movie. It returns the details of the movie, the options to give a rating, and recommended movies based off that movie
const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(
        `https://214cinenichebackend-g8a5h7bqe5auc5hw.westus3-01.azurewebsites.net/movie/${id}`,
        {
          credentials: 'include',
        }
      );
      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <AuthorizeView>
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
    </AuthorizeView>
  );
};

export default MovieDetailPage;
