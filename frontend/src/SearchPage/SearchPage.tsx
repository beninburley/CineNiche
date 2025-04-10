import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchMovies } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';
import { escape } from 'lodash';

import './SearchPage.css';
import Header from '../Homepage/Header';
import Footer from '../components/Footer';
import AuthorizeView from '../components/AuthorizeView';

const genreOptions = [
  'Action',
  'Adventure',
  'Anime',
  'Comedies',
  'Dramas',
  'Fantasy',
  'Documentaries',
  'Crime',
  'Romantic',
  'Horror',
  'Thrillers',
  'TV Shows',
  'International',
  'Children',
  'Family',
  'Reality',
];

const SearchPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(20);

  const location = useLocation();
  const query =
    new URLSearchParams(location.search).get('q')?.toLowerCase() || '';

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies(10000, 1, []);
        setMovies(data.movies);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  useEffect(() => {
    setVisibleCount(20);
  }, [query, selectedGenre]);

  const filteredMovies = movies.filter((movie) => {
    const matchesQuery = movie.title.toLowerCase().includes(query);
    const matchesGenre =
      !selectedGenre ||
      movie.categoriesString
        .toLowerCase()
        .includes(selectedGenre.toLowerCase());
    return matchesQuery && matchesGenre;
  });

  const visibleMovies = filteredMovies.slice(0, visibleCount);

  return (
    <AuthorizeView>
      <Header />
      <div className='search-page-wrapper'>
        <div className='search-page-container'>
          <h2 className='search-page-title'>
            {query || selectedGenre
              ? `Results for "${escape(query)}"${
                  selectedGenre ? ` in ${escape(selectedGenre)}` : ''
                }`
              : 'Browse Movies'}
          </h2>

          <div className='genre-filter genre-filter-top'>
            {genreOptions.map((genre) => (
              <span
                key={genre}
                className={`genre-tag ${
                  selectedGenre === genre ? 'selected' : ''
                }`}
                onClick={() =>
                  setSelectedGenre(selectedGenre === genre ? null : genre)
                }
              >
                {genre}
              </span>
            ))}
          </div>

          {loading && <p className='search-loading'>Loading...</p>}
          {error && <p className='search-error'>Error: {escape(error)}</p>}
          {!query && !selectedGenre && (
            <p className='search-empty'>
              Start typing in the search bar or choose a genre to explore
              movies.
            </p>
          )}

          <div className='movie-grid'>
            {visibleMovies.map((movie) => (
              <Link
                to={`/movie/${movie.show_id}`}
                key={movie.show_id}
                className='movie-card'
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className='movie-poster'
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/The%20Innocence%20Files.jpg';
                  }}
                />
                <h3>{escape(movie.title)}</h3>
                <p>{escape(movie.categoriesString)}</p>
              </Link>
            ))}
          </div>

          {filteredMovies.length > visibleMovies.length && (
            <div className='show-more-container'>
              <button
                className='show-more-button'
                onClick={() => setVisibleCount((prev) => prev + 20)}
              >
                Show More
              </button>
            </div>
          )}

          {filteredMovies.length === 0 && !loading && (
            <p className='search-empty'>No movies found.</p>
          )}
        </div>
      </div>
      <Footer />
    </AuthorizeView>
  );
};

export default SearchPage;
