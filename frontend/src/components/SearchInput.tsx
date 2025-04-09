// src/components/SearchInput.tsx
import React from 'react';
import DOMPurify from 'dompurify'; // ✅ Add this
import './SearchInput.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value); //This makes sure nothing malicious is put in the search bar
    onChange(sanitizedValue);
  };

  return (
    <input
      type='text'
      className='search-input'
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
