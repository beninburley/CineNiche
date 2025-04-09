// src/components/Header.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../components/SearchInput'; // Adjust the import path as necessary
import './Homepage.css'; // Still linking your styles

const Header: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchText)}`);
  };

  return (
    <header className='header'>
      <div className='header-container'>
        <div className='logo'>
          <a href='/'>CineNiche</a>
        </div>

        <nav className='nav'>
          <ul className='nav-list'>
            <li>
              <a href='/home'>Home</a>
            </li>
            <li>
              <a href='/search'>Browse</a>
            </li>
            <li>
              <a href='/adminmovies'>Admin</a>
            </li>
          </ul>
        </nav>

        <form onSubmit={handleSearchSubmit} className='search-bar'>
          <SearchInput
            value={searchText}
            onChange={setSearchText}
            placeholder='Search movies...'
          />
        </form>
      </div>
    </header>
  );
};

export default Header;
