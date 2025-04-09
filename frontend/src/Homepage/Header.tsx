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
              <a href='/home'>Home</a> {/* Main user dashboard */}
            </li>
            <li>
              <a href='/home#explore'>Browse</a>{' '}
              {/* Scroll to movie carousels or explore section */}
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
