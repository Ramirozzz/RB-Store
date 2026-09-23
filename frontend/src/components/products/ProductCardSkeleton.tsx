const ProductCardSkeleton = () => {
  return (
    <article>
      <div className="aspect-square animate-pulse bg-gray-200" />

      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 animate-pulse bg-gray-200" />
        <div className="h-3 w-1/2 animate-pulse bg-gray-200" />
        <div className="h-4 w-1/4 animate-pulse bg-gray-200" />
      </div>
    </article>
  );
};

export default ProductCardSkeleton;
