'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

type Filters = {
  category: string;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  isNew: boolean;
};

export function FilterSidebar({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  desktop = false,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  filters: Filters;
  onFiltersChange: (next: Filters) => void;
  desktop?: boolean;
}) {
  const content = (
    <div className="flex h-full w-72 flex-col gap-6 p-4">
      <div className="space-y-3">
        <div className="text-sm font-semibold">Price</div>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={0}
            value={filters.priceRange[0]}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                priceRange: [
                  Number(e.target.value || 0),
                  filters.priceRange[1],
                ],
              })
            }
            placeholder="Min"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            min={0}
            value={filters.priceRange[1]}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                priceRange: [
                  filters.priceRange[0],
                  Number(e.target.value || 0),
                ],
              })
            }
            placeholder="Max"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-semibold">Sizes</div>
        <div className="grid grid-cols-3 gap-2">
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => {
            const checked = filters.sizes.includes(s);
            return (
              <Label
                key={s}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={(val) => {
                    const next = new Set(filters.sizes);
                    if (val) next.add(s);
                    else next.delete(s);
                    onFiltersChange({ ...filters, sizes: Array.from(next) });
                  }}
                />
                {s}
              </Label>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-semibold">Only new</div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={filters.isNew}
            onCheckedChange={(val) =>
              onFiltersChange({ ...filters, isNew: Boolean(val) })
            }
            id="new-only"
          />
          <Label htmlFor="new-only">Show hits</Label>
        </div>
      </div>

      <div className="mt-auto">
        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            onFiltersChange({
              ...filters,
              sizes: [],
              isNew: false,
              priceRange: [0, 1000],
            })
          }
        >
          Reset filters
        </Button>
      </div>
    </div>
  );

  if (desktop) {
    return <aside className="hidden w-72 shrink-0 lg:block">{content}</aside>;
  }

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (!o ? onClose?.() : undefined)}>
      <SheetContent side="left" className="p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        {content}
      </SheetContent>
    </Sheet>
  );
}
