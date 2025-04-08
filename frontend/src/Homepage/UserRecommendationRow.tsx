// src/components/UserRecommendationRow.tsx
import React from 'react';
import '/src/Homepage/Homepage.CSS';

// Mock data
const recommendedMovies = [
  {
    id: 1,
    title: 'Shadows in Berlin',
    imageUrl: '/images/reco1.jpg',
  },
  {
    id: 2,
    title: 'The Color of Forgetting',
    imageUrl: '/images/reco2.jpg',
  },
  {
    id: 3,
    title: 'Celestial Silence',
    imageUrl: '/images/reco3.jpg',
  },
  {
    id: 4,
    title: 'Nostalgia Café',
    imageUrl: '/images/reco4.jpg',
  },
  {
    id: 5,
    title: 'Whispers of Clay',
    imageUrl: '/images/reco5.jpg',
  },
];

const UserRecommendationRow: React.FC = () => {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = 5; // 🔁 Replace this with dynamic value if you have user context... ***************** THIS SHOULD CHANGE WHEN WE HAVE USER'S LOGGED IN *******************

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const recs = await fetchCollabRecommendations(userId);
        const showIds = recs.map((rec) => rec.recommendedShowId);
        const movies = await fetchMoviesByIds(showIds);
        setRecommendedMovies(movies);
      } catch (error) {
        console.error('Failed to load recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [userId]);

  if (loading) return <div>Loading recommendations...</div>;

  return (
    <div className='recommendation-wrapper'>
      <div className='recommendation-row'>
        {recommendedMovies.map((movie) => (
          <div key={movie.show_id} className='recommendation-card'>
            <img
              src={':) FIX THIS LATER SMH'}
              alt={movie.title}
              className='recommendation-image'
            />
            <p className='recommendation-title'>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRecommendationRow;
