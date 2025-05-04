export interface PiNetworkConfig {
  id: string;
  symbol: string;
  name: string;
  priceGBP: number;
  marketCapGBP: number;
  percentageChange: number;
  lastUpdated: string;

  allTimeHigh: {
    priceGBP: number;
    percentageChange: number;
    date: string;
  };  

  allTimeLow: {
    priceGBP: number;
    percentageChange: number;
    date: string;
  };

  priceChange: {
    pricePi: number;
    priceGBP: number;
    percentageChange_24h: number;
    percentageChange_7d: number;
    percentageChange_14d: number;
    percentageChange_30d: number;
    percentageChange_60d: number;
    percentageChange_200d: number;
    percentageChange_1y: number;
  }
}