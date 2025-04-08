// src/pages/LandingPage.tsx
import React, { useEffect } from 'react';
import './landingPage.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

//feratured movies
const exampleMovies = [
  {
    title: '6 Balloons',
    label: 'Award Winning Drama',
    posterUrl: '/img/moviePosters/6-Balloons.jpg',
  },
  {
    title: 'Captain Fantastic',
    label: 'Indie Comedy-Drama',
    posterUrl: '/img/moviePosters/Captain Fantastic.jpg',
  },

  {
    title: 'Grass Is Greener',
    label: 'Cult Classic Romantic Comedy',
    posterUrl: '/img/moviePosters/Grass-Is-Greener.jpg',
  },
  {
    title: 'How the Beatles Changed the World',
    label: 'Musical Revolution Documentary',
    posterUrl: '/img/moviePosters/How the Beatles Changed the World.jpg',
  },

  {
    title: 'The Influence',
    label: 'Horror Thriller',
    posterUrl: '/img/moviePosters/The Influence.jpg',
  },
];

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

  return (
    <div className='landing-page'>
      <header className='landing-header'>
        <div className='logo'>
          <Link to='/' className='custom-signup'>
            CineNiche
          </Link>
        </div>
        <nav>
          <a href='/login'>Log In</a>
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
          {exampleMovies.map((movie) => (
            <div className='film-card' key={movie.title}>
              <img src={movie.posterUrl} alt={movie.title} />
              <span className='film-label'>{movie.label}</span>
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
          <cite>– A real user (probably Lena)</cite>
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
