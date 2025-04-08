// src/pages/Homepage.tsx
import React from 'react';
import '/src/Homepage/Homepage.CSS'; // Link to your CSS file for this page
import Header from './Header';
import HeroBanner from './HeroBanner';
import MoodBoardGrid from './MoodBoardGrid';
import FilmJourneyCarousel from './FilmJourneyCarousel';
import UndergroundPick from './UndergroundPick';
import UserRecommendationRow from './UserRecommendationRow';
import ReviewHighlight from './ReviewHighlight';

const Homepage: React.FC = () => {
  return (
    <div className='homepage'>
      <Header />

      <main className='homepage-main'>
        <HeroBanner />

        <section className='section mood-board'>
          <h2 className='section-title'>Mood Board</h2>
          <MoodBoardGrid />
        </section>

        <section className='section film-journeys'>
          <h2 className='section-title'>Film Journeys</h2>
          <FilmJourneyCarousel />
        </section>

        <section className='section underground-pick'>
          <h2 className='section-title'>Underground Pick</h2>
          <UndergroundPick />
        </section>

        <section className='section user-recommendations'>
          <h2 className='section-title'>Recommended for You</h2>
          <UserRecommendationRow />
        </section>

        <section className='section reviews'>
          <h2 className='section-title'>What People Are Saying</h2>
          <ReviewHighlight />
        </section>
      </main>
    </div>
  );
};

export default Homepage;
