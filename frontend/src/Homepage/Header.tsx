import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext, AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';
import './Homepage.css';

interface HeaderProps {
  hideSearchBar?: boolean;
  hideNavLinks?: boolean;
  logoDestination?: string;
}

const Header: React.FC<HeaderProps> = ({
  hideSearchBar = false,
  hideNavLinks = false,
  logoDestination = '/home',
}) => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const user = useContext(UserContext);

  useEffect(() => {
    const trimmed = searchText.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  }, [searchText, navigate]);

  return (
    <header className='header'>
      <div className='header-container'>
        <div className='logo' style={{ marginTop: '10px' }}>
          <Link to={logoDestination}>CineNiche</Link>
        </div>

        {!hideNavLinks && (
          <nav className='nav'>
            <ul className='nav-list'>
              <li>
                <Link to='/home'>Home</Link>
              </li>
              <li>
                <Link to='/search'>Browse</Link>
              </li>
              {user?.role === 'Administrator' && (
                <li>
                  <Link to='/adminmovies' className='admin-button'>
                    Admin Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}

        <div className='header-actions'>
          {!hideSearchBar && (
            <form className='search-bar' onSubmit={(e) => e.preventDefault()}>
              <input
                type='text'
                placeholder='Search movies...'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </form>
          )}

          {user && (
            <div className='user-info'>
              <span className='user-email'>
                <AuthorizedUser value='email' />
              </span>
              <div className='logout'>
                <Logout>Logout</Logout>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
