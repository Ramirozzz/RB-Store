const ProductCardSkeleton = () => {
  return (
    <article>
      <div className="aspect-square animate-pulse bg-background" />

      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 animate-pulse bg-background" />
        <div className="h-3 w-1/2 animate-pulse bg-background" />
        <div className="h-4 w-1/4 animate-pulse bg-background" />
      </div>
    </article>
  );
};

export default ProductCardSkeleton;
