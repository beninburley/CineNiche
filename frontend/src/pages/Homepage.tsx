// src/pages/Homepage.tsx
import React from 'react';
import './Homepage.css'; // Link to your CSS file for this page
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import MoodBoardGrid from '../components/MoodBoardGrid';
import FilmJourneyCarousel from '../components/FilmJourneyCarousel';
import UndergroundPick from '../components/UndergroundPick';
import UserRecommendationRow from '../components/UserRecommendationRow';
import ReviewHighlight from '../components/ReviewHighlight';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';

// import { useNavigate } from 'react-router-dom';

// const Homepage = () => {
//   const navigate = useNavigate();

//   return (
//     <div>
//       {movies.map((movie) => (
//         <div
//           key={movie.show_id}
//           className="movie-card"
//           onClick={() => navigate(`/movie/${movie.show_id}`)}
//         >
//           <h3>{movie.title}</h3>
//           {/* more movie summary info here */}
//         </div>
//       ))}
//     </div>
//   );
// };

const Homepage: React.FC = () => {
  return (
    <AuthorizeView>
      <span>
        <Logout>
          Logout <AuthorizedUser value='email' />
        </Logout>
      </span>
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
    </AuthorizeView>
  );
};

export default Homepage;
