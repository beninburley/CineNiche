import { useEffect, useState } from 'react';
import { deleteMovie, fetchMovies } from '../api/MoviesAPI';
import { Movie } from '../types/Movie';
import NewMovieForm from '../componentsJD/NewMovieForm';
import EditMovieForm from '../componentsJD/EditMovieForm';
import Pagination from '../componentsJD/Pagination';
import MovieFilter from '../componentsJD/MovieFilter';

const AdminMoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(pageSize, pageNum, selectedCategories);
        setMovies(data.movies);
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [pageSize, pageNum, selectedCategories]);

  const handleDelete = async (show_id: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this movie?'
    );
    if (!confirmDelete) return;

    try {
      await deleteMovie(show_id);
      setMovies(movies.filter((m) => m.show_id !== show_id));
    } catch (error) {
      alert('Failed to delete project. Please try again');
    }
  };

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p className='text-red-500'>Error: {error}</p>;

  return (
    <div>
      <h1>Admin - Movies</h1>

      {!showForm && (
        <button
          className='btn btn-success mb-3'
          onClick={() => setShowForm(true)}
        >
          Add Movie
        </button>
      )}
      {showForm && (
        <NewMovieForm
          onSuccess={() => {
            setShowForm(false);
            fetchMovies(pageSize, pageNum, []).then((data) =>
              setMovies(data.movies)
            );
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingMovie && (
        <EditMovieForm
          movie={editingMovie}
          onSuccess={() => {
            setEditingMovie(null);
            fetchMovies(pageSize, pageNum, []).then((data) =>
              setMovies(data.movies)
            );
          }}
          onCancel={() => setEditingMovie(null)}
        />
      )}

      <MovieFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <table className='table table-bordered table-striped'>
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
          {movies.map((m) => (
            <tr key={m.show_id}>
              <td>{m.show_id}</td>
              <td>{m.title}</td>
              <td>{m.director}</td>
              <td>{m.cast}</td>
              <td>{m.release_year}</td>
              <td>{m.categoriesString}</td>
              <td>
                <button
                  className='btn btn-primary btn-sm w-100 mb-1'
                  onClick={() => setEditingMovie(m)}
                >
                  Edit
                </button>
                <button
                  className='btn btn-danger btn-sm w-100'
                  onClick={() => handleDelete(m.show_id!)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
};

export default AdminMoviesPage;
