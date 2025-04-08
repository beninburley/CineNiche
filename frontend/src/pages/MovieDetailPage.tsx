import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Movie } from '../types/Movie';
import StarRating from '../components/StarRating';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`https://localhost:5000/movie/${id}`);
      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Directed by: {movie.director}</p>
      <p>Cast: {movie.cast}</p>
      <p>Genres: {movie.categoriesString}</p>
      {/* ⭐ 5-star rating component */}
      <StarRating movieId={movie.show_id} />
    </div>
  );
};

export default MovieDetailPage;
