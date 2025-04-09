import { useState } from 'react';
import { Movie } from '../types/Movie';
import { addMovie } from '../api/MoviesAPI';
import { useEffect } from 'react';

interface NewMovieFormProps {
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

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({
    show_id: '',
    type: '',
    title: '',
    director: '',
    cast: '',
    country: '',
    release_year: 0,
    rating: '',
    duration: '',
    description: '',
    posterUrl: '',

    // Genre flags — initially all false
    action: false,
    adventure: false,
    animeSeriesInternationalTVShows: false,
    britishDocuseriesInternationalTVShows: false,
    children: false,
    comedies: false,
    comediesDramasInternationalMovies: false,
    comediesInternationalMovies: false,
    comediesRomanticMovies: false,
    crimeTVShowsDocuseries: false,
    documentaries: false,
    documentariesInternationalMovies: false,
    docuseries: false,
    dramas: false,
    dramasInternationalMovies: false,
    dramasRomanticMovies: false,
    familyMovies: false,
    fantasy: false,
    horrorMovies: false,
    internationalMoviesThrillers: false,
    internationalTVRomanticDramas: false,
    kidsTV: false,
    languageTVShows: false,
    musicals: false,
    natureTV: false,
    realityTV: false,
    spirituality: false,
    tvAction: false,
    tvComedies: false,
    tvDramas: false,
    talkShowsTVComedies: false,
    thrillers: false,

    categories: [],
    categoriesString: '',
  });

  // ✅ ESC key listener
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onCancel]);

  // ✅ Backdrop click handler
  const handleBackdropClick = () => {
    onCancel();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const parsedValue = type === 'number' ? parseFloat(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  // const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedGenres = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );

  //   // Reset all genres to false
  //   const updatedFlags = genreOptions.reduce((acc, genre) => {
  //     const propName = camelize(genre);
  //     acc[propName] = selectedGenres.includes(genre);
  //     return acc;
  //   }, {} as any);

  //   setFormData({
  //     ...formData,
  //     ...updatedFlags,
  //     categories: selectedGenres,
  //     categoriesString: selectedGenres.join(', '),
  //   });
  // };

  const camelize = (text: string): string => {
    return text
      .replace(/[^a-zA-Z0-9 ]/g, '') // remove punctuation
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
    await addMovie(formData);
    onSuccess();
  };

  const toggleGenre = (genre: string) => {
    const updatedGenres = formData.categories.includes(genre)
      ? formData.categories.filter((g) => g !== genre)
      : [...formData.categories, genre];

    const updatedFlags = genreOptions.reduce((acc, g) => {
      const propName = camelize(g);
      acc[propName] = updatedGenres.includes(g);
      return acc;
    }, {} as any);

    setFormData({
      ...formData,
      ...updatedFlags,
      categories: updatedGenres,
      categoriesString: updatedGenres.join(', '),
    });
  };

  return (
    <div className='modal-overlay' onClick={handleBackdropClick}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='close-button' onClick={onCancel}>
          &times;
        </button>
        <form onSubmit={handleSubmit} className='new-movie-form'>
          <h2>Add New Movie</h2>

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
            <div className='genre-tags'>
              {genreOptions.map((genre) => {
                const isSelected = formData.categories.includes(genre);
                return (
                  <span
                    key={genre}
                    className={`genre-tag ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </span>
                );
              })}
            </div>
          </label>

          <button type='submit'>Add Movie</button>
          <button type='button' onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewMovieForm;
