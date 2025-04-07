import { useState } from 'react';
import { Movie } from '../types/Movie';
import { updateMovie } from '../api/MoviesAPI';
interface EditMovieFormProps {
  movie: Movie;
  onSuccess: () => void;
  onCancel: () => void;
}

const genreOptions = [
  'Action',
  'Adventure',
  'Anime Series International TV Shows',
  'British TV Shows Docuseries International TV Shows',
  'Children',
  'Comedies',
  'Comedies Dramas International Movies',
  'Comedies International Movies',
  'Comedies Romantic Movies',
  'Crime TV Shows Docuseries',
  'Documentaries',
  'Documentaries International Movies',
  'Docuseries',
  'Dramas',
  'Dramas International Movies',
  'Dramas Romantic Movies',
  'Family Movies',
  'Fantasy',
  'Horror Movies',
  'International Movies Thrillers',
  'International TV Shows Romantic TV Shows TV Dramas',
  "Kids' TV",
  'Language TV Shows',
  'Musicals',
  'Nature TV',
  'Reality TV',
  'Spirituality',
  'TV Action',
  'TV Comedies',
  'TV Dramas',
  'Talk Shows TV Comedies',
  'Thrillers',
];

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({ ...movie });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenres = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    const updatedFlags = genreOptions.reduce((acc, genre) => {
      const propName = camelize(genre);
      acc[propName] = selectedGenres.includes(genre);
      return acc;
    }, {} as any);

    setFormData({
      ...formData,
      ...updatedFlags,
      categories: selectedGenres,
      categoriesString: selectedGenres.join(', '),
    });
  };

  const camelize = (text: string): string => {
    return text
      .replace(/[^a-zA-Z0-9 ]/g, '') // Remove punctuation
      .split(' ')
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMovie(formData.show_id!, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Movie</h2>
      <label>
        Title:
        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Director:
        <input
          type='text'
          name='director'
          value={formData.director}
          onChange={handleChange}
        />
      </label>
      <label>
        Cast:
        <input
          type='text'
          name='cast'
          value={formData.cast}
          onChange={handleChange}
        />
      </label>
      <label>
        Country:
        <input
          type='text'
          name='country'
          value={formData.country}
          onChange={handleChange}
        />
      </label>
      <label>
        Release Year:
        <input
          type='number'
          name='release_year'
          value={formData.release_year}
          onChange={handleChange}
        />
      </label>
      <label>
        Rating:
        <input
          type='text'
          name='rating'
          value={formData.rating}
          onChange={handleChange}
        />
      </label>
      <label>
        Duration:
        <input
          type='text'
          name='duration'
          value={formData.duration}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <input
          type='text'
          name='description'
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Genres:
        <select
          multiple
          value={formData.categories}
          onChange={handleGenreChange}
        >
          {genreOptions.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </label>
      <button type='submit'>Save Changes</button>
      <button type='button' onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditMovieForm;
