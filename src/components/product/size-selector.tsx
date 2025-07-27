'use client';

import { useLanguage } from '@/lib/language-context';

interface SizeSelectorProps {
  sizes: Array<{
    size: string;
    inStock: boolean;
  }>;
  selectedSize: string;
  onSizeChange: (size: string) => void;
  category: string;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSizeChange,
  category,
}: SizeSelectorProps) {
  const { t } = useLanguage();
  const isShoes = category === 'shoes';

  return (
    <div className="space-y-3">
      <h4 className="font-medium">
        {t('size')}: {selectedSize || t('please_select_size')}
      </h4>
      <div className={`grid gap-2 ${isShoes ? 'grid-cols-6' : 'grid-cols-5'}`}>
        {sizes.map((sizeOption) => (
          <button
            key={sizeOption.size}
            onClick={() => sizeOption.inStock && onSizeChange(sizeOption.size)}
            disabled={!sizeOption.inStock}
            className={`rounded-md border px-4 py-3 text-sm font-medium transition-all ${
              selectedSize === sizeOption.size
                ? 'border-black bg-black text-white'
                : sizeOption.inStock
                  ? 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
                  : 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
            } ${isShoes ? 'flex aspect-square items-center justify-center' : ''} `}
          >
            {sizeOption.size}
          </button>
        ))}
      </div>
      {!selectedSize && (
        <p className="text-sm text-gray-500">{t('please_select_size')}</p>
      )}
    </div>
  );
}
