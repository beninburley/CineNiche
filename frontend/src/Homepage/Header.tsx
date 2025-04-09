// src/components/Header.tsx
import React, { useContext } from 'react';
import './Homepage.css';
import { UserContext } from '../components/AuthorizeView';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const user = useContext(UserContext);

  return (
    <header className='header'>
      <div className='header-container'>
        <div className='logo'>
          <Link to='/'>CineNiche</Link>
        </div>

        <nav className='nav'>
          <ul className='nav-list'>
            <li>
              <Link to='/explore'>Explore</Link>
            </li>
            <li>
              <Link to='/watchlist'>Watchlist</Link>
            </li>
            <li>
              <Link to='/account'>Account</Link>
            </li>

            {/* Admin-only Link */}
            {user && user.role === 'Administrator' && (
              <li>
                <Link to='/adminmovies' className='admin-button'>
                  Admin Dashboard
                </Link>
              </li>
            )}
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
