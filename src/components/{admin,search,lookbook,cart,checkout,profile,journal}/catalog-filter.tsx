'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SUPPORTED_CURRENCIES, useCurrency } from '@/lib/currency-context';
import { useLanguage } from '@/lib/language-context';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    category: string;
    priceRange: [number, number];
    sizes: string[];
    colors: string[];
    isNew: boolean;
  };
  onFiltersChange: (filters: FilterSidebarProps['filters']) => void;
}

export function FilterSidebar({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}: FilterSidebarProps) {
  const { t } = useLanguage();
  const { currency } = useCurrency();

  const currencySymbol =
    SUPPORTED_CURRENCIES[currency as keyof typeof SUPPORTED_CURRENCIES]
      ?.symbol || currency;

  const categories = [
    { value: 'all', label: t('all') },
    { value: 'new-arrivals', label: t('newArrivals') },
    { value: 'dress', label: t('dress') },
    { value: 'corsets', label: t('corsets') },
    { value: 'skirts', label: t('skirts') },
    { value: 'tops-blouses', label: t('tops_blouses') },
    { value: 'sleeves', label: t('sleeves') },
    { value: 'outerwear', label: t('outerwear') },
    { value: 'wedding-dresses', label: t('wedding_dresses') },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-20 bg-black lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-10 h-full w-80 transform bg-white transition-transform duration-300 ease-in-out lg:relative lg:w-64 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4 lg:hidden">
            <h3 className="text-lg font-semibold">{t('filter')}</h3>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto p-4">
            <div>
              <h4 className="mb-3 font-semibold">{t('category')}</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={category.value}
                      checked={filters.category === category.value}
                      onCheckedChange={() =>
                        onFiltersChange({
                          ...filters,
                          category: category.value,
                        })
                      }
                    />
                    <Label htmlFor={category.value} className="text-sm">
                      {category.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 font-semibold">{t('price')}</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="От"
                    defaultValue={filters.priceRange[0]}
                    onChange={(e) =>
                      onFiltersChange({
                        ...filters,
                        priceRange: [
                          Number.parseInt(e.target.value) || 0,
                          filters.priceRange[1],
                        ],
                      })
                    }
                    className="w-20"
                  />
                  <span>-</span>
                  <Input
                    type="number"
                    placeholder={t('to')}
                    defaultValue={filters.priceRange[1]}
                    onChange={(e) =>
                      onFiltersChange({
                        ...filters,
                        priceRange: [
                          filters.priceRange[0],
                          Number.parseInt(e.target.value) || 10000000,
                        ],
                      })
                    }
                    className="w-24"
                  />
                  <span>{currencySymbol}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="new-items"
                  checked={filters.isNew}
                  onCheckedChange={(checked) =>
                    onFiltersChange({ ...filters, isNew: checked === true })
                  }
                />
                <Label htmlFor="new-items" className="text-sm">
                  {t('newItems')}
                </Label>
              </div>
            </div>
          </div>

          <div className="border-t p-4">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() =>
                onFiltersChange({
                  category: 'all',
                  priceRange: [0, 100000],
                  sizes: [],
                  colors: [],
                  isNew: false,
                })
              }
            >
              {t('clearFilters')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
