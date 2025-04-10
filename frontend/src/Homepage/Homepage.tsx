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

// This is the homepage. There are so many components, sorry if it isn't clear what each does
const Homepage: React.FC = () => {
  const user = useContext(UserContext);
  const [recommenderId, setRecommenderId] = useState<number>(99); // default to 99
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecommenderId = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/movie/GetRecommenderId`,
          { credentials: 'include' }
        );

        if (!res.ok) throw new Error('Failed to get recommender ID');

        const data = await res.json();

        if (data?.recommenderId !== undefined && data.recommenderId !== null) {
          setRecommenderId(data.recommenderId);
        } else {
          console.warn('Recommender ID not found, using default (99)');
          setRecommenderId(99);
        }
      } catch (err) {
        console.error('Error fetching recommenderId:', err);
        setRecommenderId(99);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      getRecommenderId();
    } else {
      // Not logged in, fallback to default
      setRecommenderId(99);
      setLoading(false);
    }
  }, [user]);

  // 👇 This must be BEFORE the conditional return
  useEffect(() => {
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.reveal');

      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const revealPoint = window.innerHeight * 0.9;

        if (rect.top < revealPoint) {
          el.classList.add('visible');
        }
      });
    };

    // Add listener
    window.addEventListener('scroll', handleScroll);

    // Run once on mount in case stuff is already visible
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading || !recommenderId) return <p>Loading homepage...</p>;

  return (
    <AuthorizeView>
      <div className='page-wrapper'>
        <div className='homepage'>
          <Header />

          <main className='homepage-main'>
            <HeroBanner />

            <section className='section mood-board reveal'>
              <h2 className='section-title'>Mood Board</h2>
              <MoodBoardGrid />
            </section>

            <section className='section user-recommendations boxed-section reveal'>
              <h2 className='section-title'>Recommended for You</h2>
              <UserRecommendationRow userId={recommenderId} />
            </section>

            <section className='section user-recommendations boxed-section reveal'>
              <ActorRecommendationRow userId={recommenderId} />
            </section>

            <section className='section underground-pick reveal'>
              <h2 className='section-title'>Underground Pick</h2>
              <UndergroundPick />
            </section>

            <section className='section user-recommendations boxed-section reveal'>
              <DirectorRecommendationRow userId={recommenderId} />
            </section>

            <section className='section user-recommendations boxed-section reveal'>
              <GenreRecommendationRow userId={recommenderId} />
            </section>

            <section className='section film-journeys reveal'>
              <h2 className='section-title'>Film Journeys</h2>
              <FilmJourneyCarousel />
            </section>

            <section className='section reviews reveal'>
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
