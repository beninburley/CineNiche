// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // IT SHOULD BE NOTED I CHANGED THE URL TO NOT INCLUDE THAT SESSION STUFF BECAUSE WELLS CONFIGURED IT WRONG
    const loginUrl = `${import.meta.env.VITE_API_URL}/login`; // ✅ Clean base login endpoint

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include', // ✅ Required for cookie-based auth
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          rememberMe: rememberme, // ✅ ✅ ✅ This must be in the body
        }),
      });

      const contentLength = response.headers.get('content-length');
      const data =
        contentLength && parseInt(contentLength, 10) > 0
          ? await response.json()
          : null;

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Error logging in.');
      console.error('Login failed:', err);
    }
  };

  return (
    <div className='login-page split-layout'>
      <div className='login-left'>
        <img src='/img/old-movie.webp' alt='Cinema entrance' />
      </div>

      <div className='login-right'>
        <div className='login-container'>
          <h1 className='login-logo' onClick={() => navigate('/')}>
            CineNiche
          </h1>
          <h2>Welcome Back</h2>
          <form className='login-form' onSubmit={handleSubmit}>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label className='remember-label'>
              <input
                type='checkbox'
                checked={rememberme}
                onChange={(e) => setRememberme(e.target.checked)}
              />
              Remember me
            </label>

            {error && <p className='login-error'>{error}</p>}

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
