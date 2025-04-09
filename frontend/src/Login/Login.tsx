// src/pages/LoginPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// This is the login stuff that works parallel to the backend.
// The backend already blocks more than 5 attempts, but this helps display that to the user.

const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 5;

const getLockoutKey = (email: string) => `lockout_${email.toLowerCase()}`;

const isLockedOut = (email: string) => {
  const lockoutData = localStorage.getItem(getLockoutKey(email));
  if (!lockoutData) return false;

  const { lockedUntil } = JSON.parse(lockoutData);
  return new Date().getTime() < new Date(lockedUntil).getTime();
};

const setLockout = (email: string) => {
  const lockedUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000);
  localStorage.setItem(getLockoutKey(email), JSON.stringify({ lockedUntil }));
};

const clearLockout = (email: string) => {
  localStorage.removeItem(getLockoutKey(email));
};

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [attemptCount, setAttemptCount] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    setAttemptCount(0);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (isLockedOut(email)) {
      setError(
        `Too many failed login attempts. Please wait ${LOCKOUT_MINUTES} minutes.`
      );
      return;
    }

    const loginUrl = rememberme
      ? `${import.meta.env.VITE_API_URL}/login?useCookies=true`
      : `${import.meta.env.VITE_API_URL}/login?useSessionCookies=true`;

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include', // Ensures cookies are sent & received
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe: rememberme }),
      });

      const contentLength = response.headers.get('content-length');
      const data =
        contentLength && parseInt(contentLength, 10) > 0
          ? await response.json()
          : null;

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      clearLockout(email); // success: clear any lockout
      navigate('/home');
    } catch (err: any) {
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);

      if (newAttemptCount >= MAX_ATTEMPTS) {
        setLockout(email);
        setError(
          `Too many failed login attempts. Please wait ${LOCKOUT_MINUTES} minutes.`
        );
      } else {
        setError(err.message || 'Error logging in.');
      }
    }
  };

  return (
    <div className='login-page split-layout'>
      <div className='login-left'>
        <img src='/img/fillm.webp' alt='Cinema entrance' />
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
