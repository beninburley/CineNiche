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
              <a href='/explore'>Explore</a>
            </li>
            <li>
              <a href='/watchlist'>Watchlist</a>
            </li>
            <li>
              <a href='/account'>Account</a>
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
