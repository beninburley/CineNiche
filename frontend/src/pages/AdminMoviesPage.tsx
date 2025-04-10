import { useEffect, useState } from 'react';
import { deleteMovie, fetchMovies } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';
import NewMovieForm from '../components/NewMovieForm';
import EditMovieForm from '../components/EditMovieForm';
import Pagination from '../components/Pagination';
import MovieFilter from '../components/MovieFilter';
import './AdminMoviesPage.css';
import Footer from '../components/Footer';
import SearchInput from '../components/SearchInput';
import AuthorizeView, { AdminOnlyView } from '../components/AuthorizeView';
import Header from '../Homepage/Header';

const AdminMoviesPage = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  const loadMovies = async () => {
    try {
      const data = await fetchMovies(10000, 1, selectedCategories);
      setAllMovies(data.movies);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [selectedCategories]);

  const handleDelete = async (show_id: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this movie?'
    );
    if (!confirmDelete) return;

    try {
      await deleteMovie(show_id);
      setAllMovies(allMovies.filter((m) => m.show_id !== show_id));
    } catch (error) {
      alert('Failed to delete movie. Please try again');
    }
  };

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p className='text-red-500'>Error: {error}</p>;

  const filteredMovies = allMovies.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pagedMovies = filteredMovies.slice(
    (pageNum - 1) * pageSize,
    pageNum * pageSize
  );

  return (
    <AuthorizeView>
      <AdminOnlyView>
        <div className='admin-page'>
          <Header hideSearchBar />

          {/* --- Add Movie Button --- */}
          <div className='admin-top-button'>
            {!showForm && (
              <button
                className='admin-button'
                onClick={() => setShowForm(true)}
              >
                Add Movie
              </button>
            )}
          </div>

          {/* --- New Movie Form --- */}
          {showForm && (
            <NewMovieForm
              onSuccess={() => {
                setShowForm(false);
                loadMovies();
              }}
              onCancel={() => setShowForm(false)}
            />
          )}

          {/* --- Search Input --- */}
          <div className='admin-search-bar'>
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder='Search by title...'
            />
          </div>

          {/* --- Edit Movie Form --- */}
          {editingMovie && (
            <EditMovieForm
              movie={editingMovie}
              onSuccess={() => {
                setEditingMovie(null);
                loadMovies();
              }}
              onCancel={() => setEditingMovie(null)}
            />
          )}

          {/* --- Filters --- */}
          <MovieFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

          {/* --- Movie Table --- */}
          <div className='table-wrapper'>
            {pagedMovies.length > 0 ? (
              <table className='movie-table'>
                <thead className='table-dark'>
                  <tr>
                    <th>Show ID</th>
                    <th>Title</th>
                    <th>Director</th>
                    <th>Cast</th>
                    <th>Release Year</th>
                    <th>Genres</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {pagedMovies.map((m) => (
                    <tr key={m.show_id || m.title}>
                      <td>{m.show_id}</td>
                      <td>{m.title}</td>
                      <td>{m.director}</td>
                      <td>{m.cast}</td>
                      <td>{m.release_year}</td>
                      <td>{m.categoriesString}</td>
                      <td>
                        <button
                          className='edit-button'
                          onClick={() => setEditingMovie(m)}
                        >
                          Edit
                        </button>
                        <button
                          className='delete-button'
                          onClick={() => handleDelete(m.show_id!)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='no-results'>
                <p>No movies found.</p>
              </div>
            )}

            <Pagination
              currentPage={pageNum}
              totalPages={Math.ceil(filteredMovies.length / pageSize)}
              pageSize={pageSize}
              onPageChange={setPageNum}
              onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setPageNum(1);
              }}
            />
          </div>

          <Footer />
        </div>
      </AdminOnlyView>
    </AuthorizeView>
  );
};

export default AdminMoviesPage;
