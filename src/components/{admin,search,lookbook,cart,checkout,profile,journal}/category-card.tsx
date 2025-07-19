interface CategoryCardProps {
  image: string;
  title: string;
  className?: string;
}

export function CategoryCard({ image, title, className }: CategoryCardProps) {
  return (
    <div
      className={`group relative aspect-square cursor-pointer overflow-hidden bg-gray-100 ${className}`}
    >
      <img
        src={image || '/placeholder.svg'}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="bg-opacity-20 absolute inset-0 flex items-center justify-center bg-black">
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
    </div>
  );
}
