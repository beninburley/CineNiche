// src/pages/Homepage.tsx
import React from 'react';
import './homepage.css'; // Link to your CSS file for this page
import Header from '../HomepageComponents/Header';
import HeroBanner from '../HomepageComponents/HeroBanner';
import MoodBoardGrid from '../HomepageComponents/MoodBoardGrid';
import FilmJourneyCarousel from '../HomepageComponents/FilmJourneyCarousel';
import UndergroundPick from '../HomepageComponents/UndergroundPick';
import UserRecommendationRow from '../HomepageComponents/UserRecommendationRow';
import ReviewHighlight from '../HomepageComponents/ReviewHighlight';

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
