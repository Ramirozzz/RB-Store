const AdminProductFormSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-11 w-full animate-pulse rounded-md bg-gray-200" />
        </div>
      ))}

      <div className="h-11 w-36 animate-pulse rounded-md bg-gray-200" />
    </div>
  );
};

export default AdminProductFormSkeleton;
