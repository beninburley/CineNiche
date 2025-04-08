import { useEffect, useState } from 'react';
import './MovieFilter.css';

function MovieFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://214cinenichebackend-g8a5h7bqe5auc5hw.westus3-01.azurewebsites.net/movie/getmovietypes'
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching movie genres', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((c) => c !== target.value)
      : [...selectedCategories, target.value];
    setSelectedCategories(updatedCategories);
  }

  return (
    <div className='category-filter'>
      <div className='category-list'>
        {categories.map((c) => (
          <div key={c} className='category-item'>
            <input
              type='checkbox'
              id={c}
              value={c}
              className='category-checkbox'
              checked={selectedCategories.includes(c)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieFilter;
