// src/components/SearchInput.tsx
import React from 'react';
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
  return (
    <div className='admin-search-wrapper'>
      <input
        type='text'
        placeholder='Search by title...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='admin-search-input'
      />
    </div>
  );
};

export default SearchInput;
