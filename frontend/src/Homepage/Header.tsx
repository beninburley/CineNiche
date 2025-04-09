// src/components/Header.tsx
import React from 'react';
import './Homepage.css'; // Link to your CSS file for this component

const Header: React.FC = () => {
  return (
    <header className='header'>
      <div className='header-container'>
        <div className='logo'>
          <a href='/'>CineNiche</a>
        </div>

        <nav className='nav'>
          <ul className='nav-list'>
            <li>
              <a href='/home'>Home</a> {/* Main user dashboard */}
            </li>
            <li>
              <a href='/home#explore'>Browse</a>{' '}
              {/* Scroll to movie carousels or explore section */}
            </li>
            <li>
              <a href='/adminmovies'>Admin</a> {/* Admin movie manager */}
            </li>
          </ul>
        </nav>

        <div className='search-bar'>
          <input type='text' placeholder='Search movies...' />
        </div>
      </div>
    </header>
  );
};

export default Header;
