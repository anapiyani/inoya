interface CategoryCardProps {
  image: string;
  title: string;
  className?: string;
  real_name: string;
}

export function CategoryCard({
  image,
  title,
  className,
  real_name,
}: CategoryCardProps) {
  const isNew = title === 'NEW';

  return (
    <div
      className={`group relative flex items-center justify-center bg-gray-100 ${className} h-[300px] w-[260px]`}
      onClick={() => {
        window.location.href = `/catalog?category=${real_name.toLowerCase()}`;
      }}
    >
      {!isNew && (
        <img
          src={`/images/${image}`}
          alt={title}
          className="h-[300px] w-[250px] object-contain transition-transform duration-300 group-hover:scale-102"
        />
      )}
      <div
        className={
          isNew
            ? 'absolute inset-0 flex items-center justify-center'
            : 'absolute right-0 bottom-2 left-0 flex justify-center'
        }
      >
        <h3 className="rounded bg-white/70 px-3 py-1 text-lg font-semibold text-black">
          {title}
        </h3>
      </div>
    </div>
  );
}
