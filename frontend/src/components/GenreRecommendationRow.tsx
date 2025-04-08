import React, { useEffect, useState } from 'react';
import '../pages/Homepage.css';
import { fetchGenreRecommendations } from '../api/RecommendAPI';
import { fetchMoviesByIds } from '../api/MoviesAPI';
import { GenreRec } from '../types/GenreRec';
import { Movie } from '../types/Movie';

interface GenreBlock {
  genre: string;
  movies: Movie[];
}

const GenreRecommendationRow: React.FC = () => {
  const [genreBlocks, setGenreBlocks] = useState<GenreBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = 5; // 🔁 Replace when dynamic auth is added

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const recs: GenreRec[] = await fetchGenreRecommendations(userId);
        if (recs.length === 0) return;

        const groupedByGenre: { [genre: string]: string[] } = {};

        recs.forEach((rec) => {
          if (!groupedByGenre[rec.genre]) {
            groupedByGenre[rec.genre] = [];
          }
          groupedByGenre[rec.genre].push(rec.recommendedShowId);
        });

        const genreBlocks: GenreBlock[] = [];

        for (const genre of Object.keys(groupedByGenre)) {
          const showIds = groupedByGenre[genre];
          const movies = await fetchMoviesByIds(showIds);
          genreBlocks.push({ genre, movies });
        }

        setGenreBlocks(genreBlocks);
      } catch (error) {
        console.error('Failed to load genre-based recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [userId]);

  if (loading) return <div>Loading genre recommendations...</div>;
  if (genreBlocks.length === 0) return null;

  return (
    <>
      {genreBlocks.map((block) => (
        <div key={block.genre}>
          <h2 className='section-title'>Because you like {block.genre}:</h2>
          <div className='recommendation-wrapper'>
            <div className='recommendation-row'>
              {block.movies.map((movie) => (
                <div key={movie.show_id} className='recommendation-card'>
                  <img
                    src={':) FIX THIS LATER SMH'} // Add your actual image URL logic here
                    alt={movie.title}
                    className='recommendation-image'
                  />
                  <p className='recommendation-title'>{movie.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GenreRecommendationRow;
