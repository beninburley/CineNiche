import React, { useEffect } from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { Movie } from '../types/Movie';
import { fetchSuggestedMovies } from '../api/MoviesAPI';

// Custom hook for scroll-triggered animations
const useScrollReveal = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

const LandingPage: React.FC = () => {
  useScrollReveal();
  const [suggestedMovies, setSuggestedMovies] = React.useState<Movie[]>([]);

  useEffect(() => {
    loadSuggestedMovies();
  }, []);

  const loadSuggestedMovies = async () => {
    try {
      const data = await fetchSuggestedMovies(5);
      setSuggestedMovies(data);
    } catch (error) {
      setSuggestedMovies([]);
      console.error('Error fetching suggested movies:', error);
    }
  };

  // ✅ Fallback image handler
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.onerror = null; // Prevent infinite loop

    const fallbackImages = [
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Insidious.jpg',
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/12%20ROUND%20GUN.jpg',
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/17%20Again.jpg',
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/6%20Balloons.jpg',
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/6%20Underground.jpg',
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/6%20Years.jpg',
    ];

    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    e.currentTarget.src = fallbackImages[randomIndex];
  };
  // Content for landing page screen

  return (
    <div className='landing-page'>
      <header className='landing-header'>
        <div className='logo'>
          <Link to='/' className='custom-signup'>
            CineNiche
          </Link>
        </div>
        <nav>
          <a className='button1' href='/login'>
            Log In
          </a>
          <a href='/signup' className='cta-button'>
            Sign Up
          </a>
        </nav>
      </header>

      <section className='hero-section'>
        <video autoPlay muted loop playsInline className='hero-video'>
          <source src='/videos/hero-cineniche.mp4' type='video/mp4' />
        </video>
        <div className='hero-overlay'>
          <h1>Curated Cinema for the Curious</h1>
          <div className='hero-bottom-content'>
            <p>
              Discover rare gems, international stories, and films that matter.
            </p>
            <a href='/signup' className='hero-cta'>
              Start Watching
            </a>
          </div>
        </div>
      </section>

      <section className='about-section reveal'>
        <h2>What is CineNiche?</h2>
        <p>
          CineNiche is a streaming platform for film lovers who crave something
          different. We showcase cult classics, global cinema, indie
          documentaries, and hidden treasures you won’t find anywhere else.
        </p>
      </section>

      <section className='film-examples-section reveal'>
        <h2>What You’ll Find on CineNiche</h2>
        <div className='film-grid'>
          {(suggestedMovies || []).map((movie) => (
            <div className='film-card' key={movie.title}>
              <img
                src={movie.posterUrl}
                alt={movie.title}
                onError={handleImageError}
              />
              <span className='film-label'>{movie.categoriesString}</span>
            </div>
          ))}
        </div>
        <p className='film-explainer'>
          Every title on CineNiche is handpicked to deliver something rare,
          beautiful, or unexpected. We don’t just show movies—we spotlight
          stories.
        </p>
      </section>

      <section className='testimonial-section reveal'>
        <blockquote>
          “CineNiche made me fall in love with cinema all over again.”
          <cite>-Lena Park, a movie fanatic</cite>
        </blockquote>
      </section>

      <section className='final-cta reveal'>
        <h2>Ready to explore the unexpected?</h2>
        <a href='/signup' className='final-button'>
          Join CineNiche
        </a>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
