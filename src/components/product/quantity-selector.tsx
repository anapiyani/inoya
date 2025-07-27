'use client';

import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  max?: number;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  max = 10,
}: QuantitySelectorProps) {
  const { t } = useLanguage();
  const decrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium">{t('quantity')}:</h4>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={decrease}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-12 text-center font-medium">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={increase}
          disabled={quantity >= max}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
