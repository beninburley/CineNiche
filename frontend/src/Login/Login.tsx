// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in:', formData);
    // Hook this up to your backend later
  };

  return (
    <div className='login-page split-layout'>
      <div className='login-left'>
        <img src='/img/old-movie.webp' alt='Cinema entrance' />
      </div>

      <div className='login-right'>
        <div className='login-container'>
          <h1 className='login-logo'>
            <Link to='/' className='login-logo'>
              CineNiche
            </Link>
          </h1>
          <h2>Welcome Back</h2>
          <form className='login-form' onSubmit={handleSubmit}>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type='submit' className='login-button'>
              Log In
            </button>
          </form>
          <p className='signup-link'>
            New to CineNiche? <a href='/signup'>Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
