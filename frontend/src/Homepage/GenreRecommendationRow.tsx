import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { fetchGenreRecommendations } from '../api/RecommendAPI';
import { fetchMoviesByIds } from '../api/MoviesAPI';
import { GenreRec } from '../types/GenreRec';
import { Movie } from '../types/Movie';
import { Link } from 'react-router-dom';

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
                <Link to={`/movie/${movie.show_id}`}>
                  <div key={movie.show_id} className='recommendation-card'>
                  <img
                    src={`https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/${movie.title}.jpg`}
                    alt={movie.title}
                    className='recommendation-image'
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      const fallbackImages = [
                        'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/NOVA%20First%20Face%20of%20America.jpg',
                        'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/La%20Robe%20De%20Mariee%20Des%20Cieux.jpg',  
                        'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Christmas%20Crossfire.jpg  ',
                        'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Salem%20His%20Sisters%20Father.jpg',
                        'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/One%20Strange%20Rock.jpg',
                        'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Retablo.jpg',
                        'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Save%20Me.jpg',
                        'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/The%20Kominsky%20Method.jpg',
                        'https://storage.googleapis.com/team2-14/Movie%20Posters/Move1/Japan%20Sinks%202020.jpg'
                        
                        
                      ];
                      const randomIndex = Math.floor(Math.random() * fallbackImages.length);
                      e.currentTarget.src = fallbackImages[randomIndex];
                    }}
                  />
                  <p className='recommendation-title'>{movie.title}</p>
                </div>
                </Link>
                
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default GenreRecommendationRow;
