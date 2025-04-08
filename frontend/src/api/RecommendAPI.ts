import { ActorRec } from '../types/ActorRec';
import { CollabRec } from '../types/CollabRec';
import { ContentRec } from '../types/ContentRec';
import { DirectorRec } from '../types/DirectorRec';
import { GenreRec } from '../types/GenreRec';

const RECOMMEND_API_URL =
  'https://214cinenichebackend-g8a5h7bqe5auc5hw.westus3-01.azurewebsites.net/recommendation';

export const fetchCollabRecommendations = async (
  userId: number
): Promise<CollabRec[]> => {
  try {
    const response = await fetch(`${RECOMMEND_API_URL}/collab/${userId}`);
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
    const response = await fetch(`${RECOMMEND_API_URL}/actor/${userId}`);
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
    const response = await fetch(`${RECOMMEND_API_URL}/director/${userId}`);
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
    const response = await fetch(`${RECOMMEND_API_URL}/genre/${userId}`);
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
    const response = await fetch(`${RECOMMEND_API_URL}/content/${seedShowId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch content-based recommendations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching content-based recommendations:', error);
    throw error;
  }
};
