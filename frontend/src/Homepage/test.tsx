import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';

const movies = [
  {
    title: 'Star Men',
    imageUrl:
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Star%20Men.jpg',
    description:
      'Four astronomers from England celebrate 50 years of friendship and achievement by taking a reflective road trip through the American Southwest.',
    show_id: 's4148',
  },

  {
    title: 'Deep',
    imageUrl:
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Deep.jpg',
    description:
      'Four insomniac med school students are lured into a neuroscience experiment that spirals out of control — and must find a way out before it’s too late.',
    show_id: 's440',
  },

  {
    title: 'Mantra',
    imageUrl:
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Mantra.jpg',
    description:
      'An Indian business owner struggles to keep his company afloat amid global competition while trying to make up for lost time with his family.',
    show_id: 's7402',
  },
  {
    title: 'Lupin',
    imageUrl:
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Lupin.jpg',
    description:
      'Inspired by the adventures of Arsène Lupin gentleman thief Assane Diop sets out to avenge his father for an injustice inflicted by a wealthy family.',
    show_id: 's735',
  },

  {
    title: 'Peppermint',
    imageUrl:
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Peppermint.jpg',
    description:
      'After her family is murdered a mild-mannered mom remakes herself into a badass vigilante in order to exact violent justice.',
    show_id: 's1621',
  },
  {
    title: 'Yellowbird',
    imageUrl:
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Yellowbird.jpg',
    description:
      'An orphaned bird tags along with a flock on their long migration to Africa and becomes a hero when his newfound "family" runs into trouble.',
    show_id: 's8777',
  },
  {
    title: 'Wakfu',
    imageUrl:
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Wakfu.jpg',
    description:
      'Yugo a 12-year-old Eliatrope with special powers sets out on a mission to find his true family and uncover the mysteries of Wakfu.',
    show_id: 's4943',
  },
  {
    title: 'MANK',
    imageUrl:
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/MANK.jpg',
    description:
      '1930s Hollywood is reevaluated through the eyes of scathing wit and alcoholic screenwriter Herman J. Mankiewicz as he races to finish “Citizen Kane.',
    show_id: 's1596',
  },
];

const HeroBanner: React.FC = () => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const movie = movies[randomIndex];

  return (
    <section
      className='hero-banner'
      style={{
        backgroundImage: `url(${movie.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='hero-overlay'>
        <div className='hero-content'>
          <h1 className='hero-title'>{movie.title}</h1>
          <p className='hero-description'>{movie.description}</p>
          <Link to={`/movie/${movie.show_id}`}>
            <button className='hero-button'>Watch Now</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
