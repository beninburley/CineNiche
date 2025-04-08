// src/pages/Homepage.tsx
import React from 'react';
import '../Homepage/Homepage.css'; // Link to your CSS file for this page
import Header from '../Homepage/Header';
import Pirvacypolicy from '../components/Privacy';

const Privacy: React.FC = () => {
  return (
    <div className='homepage'>
      <Header />

      <main className='homepage-main'>
        <section className='section film-journeys'>
          <h2 className='section-title'>Privacy Policy</h2>
          <Pirvacypolicy />
        </section>
      </main>
    </div>
  );
};

export default Privacy;
