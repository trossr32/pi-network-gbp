import { PiNetworkConfig } from '../types/PiNetworkConfig';
import { PiNetworkConfigWithAmount } from '../types/PiNetworkConfigWithAmount';

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

// Fetch Pi Network config for a specific coin amount and add customHoldings
export const fetchPiNetworkConfigForAmount = async (
  coinAmount: number
): Promise<PiNetworkConfigWithAmount> => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/data.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pi Network configuration');
    }
    const data = await response.json();

    // Add the new parameter based on coinAmount
    data.customHoldings = {
      count: coinAmount,
      totalGBP: +(data.priceGBP * coinAmount).toFixed(6),
      high_24hGBP: +(data.high_24hGBP * coinAmount).toFixed(6),
      low_24hGBP: +(data.low_24hGBP * coinAmount).toFixed(6),
      allTimeHigh: {
        priceGBP: +(data.allTimeHigh.priceGBP * coinAmount).toFixed(6),
        percentageChange: data.allTimeHigh.percentageChange,
        date: data.allTimeHigh.date
      },
      allTimeLow: {
        priceGBP: +(data.allTimeLow.priceGBP * coinAmount).toFixed(6),
        percentageChange: data.allTimeLow.percentageChange,
        date: data.allTimeLow.date
      }
    };

    return data as PiNetworkConfigWithAmount;
  } catch (error) {
    console.error('Error fetching Pi Network configuration for amount:', error);
    throw error;
  }
};