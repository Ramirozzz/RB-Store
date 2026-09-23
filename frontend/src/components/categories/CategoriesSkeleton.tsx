const CategoriesSkeleton = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 px-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-9 w-24 animate-pulse bg-gray-200" />
      ))}
    </div>
  );
};

export default CategoriesSkeleton;
