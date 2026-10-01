const OrderCardSkeleton = () => {
  return (
    <div className="animate-pulse border border-border bg-white">
      <div className="flex items-center justify-between border-b border-border px-5 py-5 sm:px-6">
        <div>
          <div className="h-3 w-12 bg-background" />
          <div className="mt-2 h-4 w-16 bg-background" />
        </div>

        <div className="h-3 w-24 bg-background" />
      </div>

      <div className="flex gap-4 px-5 py-5 sm:px-6">
        <div className="h-24 w-24 shrink-0 bg-background sm:h-28 sm:w-28" />

        <div className="flex flex-1 flex-col justify-center gap-3">
          <div className="h-4 w-40 bg-background" />
          <div className="h-3 w-24 bg-background" />
          <div className="h-3 w-16 bg-background" />
        </div>

        <div className="h-4 w-16 bg-background" />
      </div>

      <div className="flex items-center justify-between border-t border-border bg-neutral-50 px-5 py-5 sm:px-6">
        <div className="h-3 w-12 bg-background" />
        <div className="h-5 w-20 bg-background" />
      </div>
    </div>
  );
};

export default OrderCardSkeleton;
