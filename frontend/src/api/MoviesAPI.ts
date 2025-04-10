import { Movie } from '../types/Movie';

interface FetchMovieResponse {
  movies: Movie[];
  totalNumMovies: number;
}

// this variable will determine the link depending on if you're in prod or dev

const API_URL = `${import.meta.env.VITE_API_URL}/movie`;

export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchMovieResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `movieTypes=${encodeURIComponent(cat)}`)
      .join('&');
    const response = await fetch(
      `${API_URL}/allmovies/?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`,
      {
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching movies', error);
    throw error;
  }
};

// this will load movies in a variety of ways throughout the site

export const fetchSuggestedMovies = async (count: number): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_URL}/suggestedMovies?count=${count}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch suggested movies');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching suggested movies', error);
    throw error;
  }
};

// post route to add movies if you're a admin

export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: 'POST',
      credentials: 'include', // ✅ Ensures cookies are sent & received
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    });

    if (!response.ok) {
      throw new Error('Failed to add movie');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding movie', error);
    throw error;
  }
};

// update movie

export const updateMovie = async (
  show_id: string,
  updatedMovie: Movie
): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/UpdateMovie/${show_id}`, {
      method: 'PUT',
      credentials: 'include', // ✅ Ensures cookies are sent & received
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    });

    if (!response.ok) {
      // Optional: log or handle different status codes
      throw new Error(`Failed to update movie. Status: ${response.status}`);
    }

    return await response.json(); // ✅ only called if response was OK
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
};

// delete movies

export const deleteMovie = async (show_id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${show_id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};

// fetch movies by ID to help out with the search and page details

export const fetchMoviesByIds = async (showIds: string[]): Promise<Movie[]> => {
  try {
    const response = await fetch(`${API_URL}/batch`, {
      method: 'POST',
      credentials: 'include', // ✅ Ensures cookies are sent & received
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(showIds),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movies by IDs:', error);
    throw error;
  }
};
