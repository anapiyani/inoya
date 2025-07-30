'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useCurrency, SUPPORTED_CURRENCIES } from '@/lib/currency-context';
import { Button } from './button';

export function CurrencySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currency, setCurrency, isLoading } = useCurrency();

  const currentCurrency = SUPPORTED_CURRENCIES[currency as keyof typeof SUPPORTED_CURRENCIES];

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1 px-2 py-1 text-sm"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
      >
        <span>{currentCurrency?.symbol || currency}</span>
        <ChevronDown className="h-3 w-3" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full z-20 mt-1 w-32 rounded-md border bg-white shadow-lg">
            {Object.entries(SUPPORTED_CURRENCIES).map(([code, info]) => (
              <button
                key={code}
                className={`flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 ${
                  currency === code ? 'bg-gray-100' : ''
                }`}
                onClick={() => {
                  setCurrency(code);
                  setIsOpen(false);
                }}
              >
                <span>{info.symbol} {code}</span>
                {currency === code && (
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
