import { PiNetworkConfig } from '../types';

export const fetchPiNetworkConfig = async (): Promise<PiNetworkConfig> => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/data.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pi Network configuration');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Pi Network configuration:', error);
    throw error;
  }
};