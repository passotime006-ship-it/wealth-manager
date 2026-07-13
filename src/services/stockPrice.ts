// src/services/stockPrice.ts
import axios from 'axios';

// Fetches the latest price for a symbol using a free API.
// The API key is provided via VITE_STOCK_API_KEY in your .env file.
// You can swap the provider (Alpha Vantage, Twelve Data, Finnhub) as you like.
export const fetchPrice = async (symbol: string): Promise<number> => {
  const key = import.meta.env.VITE_STOCK_API_KEY;
  if (!key) {
    throw new Error('Stock API key missing. Add VITE_STOCK_API_KEY to your .env file.');
  }

  // Example using Alpha Vantage's GLOBAL_QUOTE endpoint.
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(
    symbol
  )}&apikey=${key}`;

  const { data } = await axios.get(url);
  const price = data?.['Global Quote']?.['05. price'];
  if (!price) {
    throw new Error(`No price found for ${symbol}`);
  }
  return parseFloat(price);
};
