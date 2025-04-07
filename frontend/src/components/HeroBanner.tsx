import React from 'react';
import '/src/HomepageComplete/Homepage.CSS';

const HeroBanner: React.FC = () => {
  return (
    <section className='hero-banner'>
      <div className='hero-overlay'>
        <div className='hero-content'>
          <h1 className='hero-title'>“Dreams Don’t End at Dawn”</h1>
          <p className='hero-description'>
            A surreal coming-of-age journey through post-war Tokyo. Now
            streaming exclusively on CineNiche.
          </p>
          <button className='hero-button'>Watch Now</button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
