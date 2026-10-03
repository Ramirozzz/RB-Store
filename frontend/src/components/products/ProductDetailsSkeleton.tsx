import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-40 py-10 sm:px-8 lg:px-10">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-sm">
        <div className="h-4 w-10 animate-pulse rounded bg-background" />
        <span>/</span>
        <div className="h-4 w-16 animate-pulse rounded bg-background" />
        <span>/</span>
        <div className="h-4 w-20 animate-pulse rounded bg-background" />
      </div>

      <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Back button */}
        <div className="absolute top-5 -left-4 flex h-8 w-20 animate-pulse items-center bg-background md:-left-7" />

        {/* Product image */}
        <div className="aspect-square animate-pulse overflow-hidden bg-background" />

        {/* Product information */}
        <div className="flex flex-col justify-center">
          {/* Category */}
          <div className="h-4 w-20 animate-pulse rounded bg-background" />

          {/* Name */}
          <div className="mt-4 h-12 w-48 animate-pulse rounded bg-background lg:h-14" />

          {/* Price */}
          <div className="mt-5 h-7 w-24 animate-pulse rounded bg-background" />

          {/* Description */}
          <div className="mt-6 max-w-lg space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-background" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-background" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-background" />
          </div>

          {/* Actions */}
          <div className="mt-8 border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <div className="h-13 w-full animate-pulse bg-background" />

              <div className="h-13 w-13 shrink-0 animate-pulse border border-border bg-background" />
            </div>

            {/* Stock */}
            <div className="mt-4 h-5 w-32 animate-pulse rounded bg-background" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
