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
    pricePi_24h: number;
    priceGBP24h: number;
    percentageChangePi_24h: number;
    percentageChangePi_7d: number;
    percentageChangePi_14d: number;
    percentageChangePi_30d: number;
    percentageChangePi_60d: number;
    percentageChangePi_200d: number | null;
    percentageChangePi_1y: number | null;
    percentageChangePi_GBP: number;
    percentageChangePi_GBP_7d: number;
    percentageChangePi_GBP_14d: number;
    percentageChangePi_GBP_30d: number;
    percentageChangePi_GBP_60d: number;
    percentageChangePi_GBP_200d: number | null;
    percentageChangePi_GBP_1y: number | null;
  };
}
