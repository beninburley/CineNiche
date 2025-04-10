import { ActorRec } from '../types/ActorRec';
import { CollabRec } from '../types/CollabRec';
import { ContentRec } from '../types/ContentRec';
import { DirectorRec } from '../types/DirectorRec';
import { GenreRec } from '../types/GenreRec';
import { HybridRec } from '../types/HybridRec';

const RECOMMEND_API_URL = `${import.meta.env.VITE_API_URL}/recommendation`;

export const fetchCollabRecommendations = async (
  userId: number
): Promise<CollabRec[]> => {
  try {
    const response = await fetch(`${RECOMMEND_API_URL}/collab/${userId}`, {
      credentials: 'include', // ✅ Ensures cookies are sent & received
    });
    if (!response.ok) {
      throw new Error('Failed to fetch collaborative recommendations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching collaborative recommendations:', error);
    throw error;
  }
};

export const fetchActorRecommendations = async (
  userId: number
): Promise<ActorRec[]> => {
  try {
    const response = await fetch(`${RECOMMEND_API_URL}/actor/${userId}`, {
      credentials: 'include', // ✅ Ensures cookies are sent & received
    });
    if (!response.ok) {
      throw new Error('Failed to fetch actor recommendations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching actor recommendations:', error);
    throw error;
  }
};

export const fetchDirectorRecommendations = async (
  userId: number
): Promise<DirectorRec[]> => {
  try {
    const response = await fetch(`${RECOMMEND_API_URL}/director/${userId}`, {
      credentials: 'include', // ✅ Ensures cookies are sent & received
    });
    if (!response.ok) {
      throw new Error('Failed to fetch director recommendations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching director recommendations:', error);
    throw error;
  }
};

export const fetchGenreRecommendations = async (
  userId: number
): Promise<GenreRec[]> => {
  try {
    const response = await fetch(`${RECOMMEND_API_URL}/genre/${userId}`, {
      credentials: 'include', // ✅ Ensures cookies are sent & received
    });
    if (!response.ok) {
      throw new Error('Failed to fetch genre recommendations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching genre recommendations:', error);
    throw error;
  }
};

export const fetchContentRecommendations = async (
  seedShowId: string
): Promise<ContentRec[]> => {
  try {
    const response = await fetch(`${RECOMMEND_API_URL}/content/${seedShowId}`, {
      credentials: 'include', // ✅ Ensures cookies are sent & received
    });
    if (!response.ok) {
      throw new Error('Failed to fetch content-based recommendations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching content-based recommendations:', error);
    throw error;
  }
};

export const fetchHybridRecommendations = async (
  seedShowId: string,
  userId: number
): Promise<HybridRec[]> => {
  try {
    const response = await fetch(
      `${RECOMMEND_API_URL}/hybrid/${userId}/${seedShowId}`,
      {
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch hybrid recommendations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching hybrid recommendations:', error);
    throw error;
  }
};
