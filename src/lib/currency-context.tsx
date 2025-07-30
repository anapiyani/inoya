'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  exchangeRates: Record<string, number>;
  convertPrice: (priceKzt: number) => number;
  formatPrice: (priceKzt: number) => string;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

const SUPPORTED_CURRENCIES = {
  KZT: { symbol: '₸', name: 'Tenge' },
  USD: { symbol: '$', name: 'US Dollar' },
  RUB: { symbol: '₽', name: 'Russian Ruble' },
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<string>('KZT');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({
    KZT: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load currency from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCurrency = localStorage.getItem('currency') || 'KZT';
      setCurrencyState(savedCurrency);
    }
  }, []);

  // Fetch exchange rates when currency changes
  useEffect(() => {
    if (currency === 'KZT') {
      setExchangeRates({ KZT: 1 });
      return;
    }

    const fetchExchangeRates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://api.exchangerate-api.com/v4/latest/KZT'
        );
        const data = await response.json();

        const rates: Record<string, number> = { KZT: 1 };
        Object.keys(SUPPORTED_CURRENCIES).forEach((curr) => {
          if (curr !== 'KZT' && data.rates[curr]) {
            rates[curr] = data.rates[curr];
          }
        });

        setExchangeRates(rates);

        // Store in localStorage for offline use
        localStorage.setItem('exchangeRates', JSON.stringify(rates));
        localStorage.setItem('exchangeRatesTimestamp', Date.now().toString());
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);

        // Try to use cached rates
        const cachedRates = localStorage.getItem('exchangeRates');
        if (cachedRates) {
          setExchangeRates(JSON.parse(cachedRates));
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Check if we have recent cached data (less than 1 hour old)
    const cachedTimestamp = localStorage.getItem('exchangeRatesTimestamp');
    const isRecentCache =
      cachedTimestamp && Date.now() - parseInt(cachedTimestamp) < 3600000; // 1 hour

    if (isRecentCache) {
      const cachedRates = localStorage.getItem('exchangeRates');
      if (cachedRates) {
        setExchangeRates(JSON.parse(cachedRates));
        return;
      }
    }

    fetchExchangeRates();
  }, [currency]);

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currency', newCurrency);
    }
  };

  const convertPrice = (priceKzt: number): number => {
    if (currency === 'KZT') return priceKzt;
    const rate = exchangeRates[currency];
    return rate ? priceKzt * rate : priceKzt;
  };

  const formatPrice = (priceKzt: number): string => {
    const convertedPrice = convertPrice(priceKzt);
    const currencyInfo =
      SUPPORTED_CURRENCIES[currency as keyof typeof SUPPORTED_CURRENCIES];

    if (currency === 'KZT') {
      return `${Math.round(convertedPrice).toLocaleString()} ${currencyInfo.symbol}`;
    } else {
      return `${currencyInfo.symbol}${convertedPrice.toFixed(2)}`;
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        exchangeRates,
        convertPrice,
        formatPrice,
        isLoading,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

export { SUPPORTED_CURRENCIES };
