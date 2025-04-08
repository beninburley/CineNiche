// src/pages/SignUpPage.tsx
import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signing up:', formData);
  };

  return (
    <div className='signup-page split-layout'>
      <div className='signup-left'>
        {/* You can use an <img> or <video> here */}
        <video autoPlay muted loop playsInline>
          <source src='/videos/signup-cinema.mp4' type='video/mp4' />
        </video>
      </div>

      <div className='signup-right'>
        <div className='signup-container'>
          <h1 className='signup-logo'>
            <Link to='/' className='signup-logo'>
              CineNiche
            </Link>
          </h1>
          <h2>Create Your Account</h2>
          <form className='signup-form' onSubmit={handleSubmit}>
            <input
              type='text'
              name='name'
              placeholder='Name (optional)'
              value={formData.name}
              onChange={handleChange}
            />
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
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type='submit' className='signup-button'>
              Sign Up
            </button>
          </form>
          <p className='login-link'>
            Already have an account? <a href='/login'>Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
