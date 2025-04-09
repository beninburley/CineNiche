import { Movie } from '../types/Movie';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      to={`/movie/${movie.show_id}`}
      className='bg-gray-800 text-white p-4 rounded-2xl shadow hover:shadow-lg hover:bg-gray-700 transition-all'
    >
      <h3 className='text-xl font-semibold'>{movie.title}</h3>
      <p className='text-sm text-gray-400 mt-1'>{movie.categoriesString}</p>
    </Link>
  );
};

export default MovieCard;
