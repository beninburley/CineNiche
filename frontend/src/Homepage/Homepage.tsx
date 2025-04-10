import React, { useEffect, useState, useContext } from 'react';
import './Homepage.css';
import Header from './Header';
import HeroBanner from './HeroBanner';
import MoodBoardGrid from './MoodBoardGrid';
import FilmJourneyCarousel from './FilmJourneyCarousel';
import UndergroundPick from './UndergroundPick';
import UserRecommendationRow from './UserRecommendationRow';
import ReviewHighlight from './ReviewHighlight';
import ActorRecommendationRow from './ActorRecommendationRow';
import DirectorRecommendationRow from './DirectorRecommendationRow';
import GenreRecommendationRow from './GenreRecommendationRow';
import Footer from '../components/Footer';
import AuthorizeView, { UserContext } from '../components/AuthorizeView';

const Homepage: React.FC = () => {
  const user = useContext(UserContext);
  const [recommenderId, setRecommenderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(user?.email);

  useEffect(() => {
    const getRecommenderId = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/movie/GetRecommenderId`,
          {
            credentials: 'include',
          }
        );

        if (!res.ok) throw new Error('Failed to get recommender ID');
        const data = await res.json();
        console.log('Recommender ID:', data.recommenderId);
        setRecommenderId(data.recommenderId);
        console.log(recommenderId);
      } catch (err) {
        console.error('Error fetching recommenderId:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      getRecommenderId();
    }
  }, [user]);

  if (loading || !recommenderId) return <p>Loading homepage...</p>;

  return (
    <AuthorizeView>
      <div className='page-wrapper'>
        <div className='homepage'>
          <Header />

          <main className='homepage-main'>
            <HeroBanner />

            <section className='section mood-board'>
              <h2 className='section-title'>Mood Board</h2>
              <MoodBoardGrid />
            </section>

            <section className='section user-recommendations'>
              <h2 className='section-title'>Recommended for You</h2>
              <UserRecommendationRow userId={recommenderId} />
            </section>

            <section className='section user-recommendations'>
              <ActorRecommendationRow userId={recommenderId} />
            </section>
            <section className='section underground-pick'>
              <h2 className='section-title'>Underground Pick</h2>
              <UndergroundPick />
            </section>

            <section className='section user-recommendations'>
              <DirectorRecommendationRow userId={recommenderId} />
            </section>

            <section className='section user-recommendations'>
              <GenreRecommendationRow userId={recommenderId} />
            </section>
            <section className='section film-journeys'>
              <h2 className='section-title'>Film Journeys</h2>
              <FilmJourneyCarousel />
            </section>

            <section className='section reviews'>
              <h2 className='section-title'>What People Are Saying</h2>
              <ReviewHighlight />
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </AuthorizeView>
  );
};

export default Homepage;
