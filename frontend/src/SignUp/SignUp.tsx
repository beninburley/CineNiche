// Sign Up page that handles the registration process
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;

    // Simple validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Call the registration API and attempt to make an account. If there is an error it returns the registration error message.
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    }
  };

  // Form for creating an account
  return (
    <div className='signup-page split-layout'>
      <div className='signup-left'>
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
            <p
              style={{
                fontSize: '0.875rem',
                color: '#aaa',
                marginTop: '0.25rem',
              }} // New password requirements
            >
              Must be at least 12 characters, include an uppercase letter, a
              number, and a special character.
            </p>

            {error && <p className='signup-error'>{error}</p>}

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
