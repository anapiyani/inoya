'use client';

interface ColorSelectorProps {
  colors: Array<{
    name: string;
    code: string;
  }>;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export function ColorSelector({
  colors,
  selectedColor,
  onColorChange,
}: ColorSelectorProps) {
  return (
    <div className="space-y-3">
      <h4 className="font-medium">Цвет: {selectedColor}</h4>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorChange(color.name)}
            className={`border-0.5 relative h-6 w-6 rounded-full transition-all ${
              selectedColor === color.name
                ? 'scale-110 border-black'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            style={{
              background:
                color.name === 'Белый'
                  ? `linear-gradient(45deg, ${color.code} 25%, transparent 25%), linear-gradient(-45deg, ${color.code} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${color.code} 75%), linear-gradient(-45deg, transparent 75%, ${color.code} 75%)`
                  : color.code,
              backgroundSize: color.name === 'Белый' ? '8px 8px' : 'auto',
              backgroundPosition:
                color.name === 'Белый'
                  ? '0 0, 0 4px, 4px -4px, -4px 0px'
                  : 'auto',
            }}
            title={color.name}
          >
            {color.name === 'Белый' && (
              <div
                className="absolute inset-1 rounded-full border"
                style={{ backgroundColor: color.code, borderColor: '#e5e7eb' }}
              />
            )}
            {selectedColor === color.name && (
              <div className="absolute inset-0 rounded-full border-2 border-black" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
