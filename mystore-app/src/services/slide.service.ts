import api from './api';
import type { Slide } from '../modals/Slide';

export const getSlides = async (): Promise<Slide[]> => {
  try {
    const response = await api.get<Slide[]>('/slides');
    return response.data;
    } catch (error) {   
    console.error('Error fetching slides:', error);
    throw error;
  }
};



