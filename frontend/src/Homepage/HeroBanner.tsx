import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';

const movies = [
 

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
    title: 'Secrets of Underground London',
    imageUrl:
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Secrets%20of%20Underground%20London.jpg',
    description:
      'Experts examine the ruins and relics hidden beneath Londons surface unearthing a Roman amphitheater plague pits air raid shelters and more.',
    show_id: 's7979',
  },
  {
    title: 'Get Organized with The Home Edit',
    imageUrl:
      'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Get%20Organized%20with%20The%20Home%20Edit.jpg',
    description:
      'Expert home organizers Clea and Joanna help celebrities and everyday clients edit categorize and contain their clutter to create stunning spaces.',
    show_id: 's2033',
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
