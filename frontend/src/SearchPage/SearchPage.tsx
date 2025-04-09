import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchMovies } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';

import './SearchPage.css';
import Header from '../Homepage/Header';
import Footer from '../components/Footer';
import AuthorizeView from '../components/AuthorizeView';

const SearchPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const query =
    new URLSearchParams(location.search).get('q')?.toLowerCase() || '';

  useEffect(() => {
    if (!query) return; // ⛔ Don't fetch if there's no search query

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
  }, [query]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query)
  );

  return (
    <>
      <AuthorizeView>
        <Header />
        <div className='search-page-wrapper'>
          <div className='search-page-container'>
            <h2 className='search-page-title'>
              {query ? `Results for "${query}"` : `Browse Movies`}
            </h2>

            {loading && <p className='search-loading'>Loading...</p>}
            {error && <p className='search-error'>Error: {error}</p>}
            {!query && (
              <p className='search-empty'>
                Start typing in the search bar to find movies.
              </p>
            )}

            <div className='movie-grid'>
              {query &&
                filteredMovies.map((movie) => (
                  <Link
                    to={`/movie/${movie.show_id}`}
                    key={movie.show_id}
                    className='movie-card'
                  >
                    <h3>{movie.title}</h3>
                    <p>{movie.categoriesString}</p>
                  </Link>
                ))}
            </div>

            {query && filteredMovies.length === 0 && !loading && (
              <p className='search-empty'>No movies found.</p>
            )}
          </div>
        </div>
        <Footer />
      </AuthorizeView>
    </>
  );
};

export default SearchPage;
