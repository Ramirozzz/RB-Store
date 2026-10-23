const AdminDashboardSkeleton = () => {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="rounded-lg bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="h-4 w-20 animate-pulse rounded bg-background" />
            <div className="h-9 w-9 animate-pulse rounded bg-background" />
          </div>

          <div className="mt-5 h-8 w-14 animate-pulse rounded bg-background" />
        </div>
      ))}
    </div>
  );
};

export default AdminDashboardSkeleton;
