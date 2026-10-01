const CategoriesSkeleton = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-wrap items-center justify-start gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-9 w-24 animate-pulse bg-background" />
        ))}
      </div>
      <div className="h-9 w-24 animate-pulse bg-background" />
    </div>
  );
};

export default CategoriesSkeleton;
