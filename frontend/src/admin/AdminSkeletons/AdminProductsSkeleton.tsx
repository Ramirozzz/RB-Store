const AdminProductsSkeleton = () => {
  return (
    <div className="overflow-x-auto bg-white shadow-lg">
      <table className="w-full min-w-[700px] text-left">
        <thead className="border-b border-border">
          <tr>
            <th className="px-5 py-4 text-sm">Product</th>
            <th className="px-5 py-4 text-sm">Category</th>
            <th className="px-5 py-4 text-sm">Price</th>
            <th className="px-5 py-4 text-sm">Stock</th>
            <th className="px-5 py-4 text-sm">Status</th>
            <th className="px-5 py-4 text-sm">Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 8 }).map((_, index) => (
            <tr key={index} className="border-b border-border last:border-b-0">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 animate-pulse bg-background" />

                  <div className="h-4 w-32 animate-pulse bg-background" />
                </div>
              </td>

              <td className="px-5 py-4">
                <div className="h-4 w-24 animate-pulse bg-background" />
              </td>

              <td className="px-5 py-4">
                <div className="h-4 w-16 animate-pulse bg-background" />
              </td>

              <td className="px-5 py-4">
                <div className="h-4 w-10 animate-pulse bg-background" />
              </td>

              <td className="px-5 py-4">
                <div className="h-4 w-20 animate-pulse bg-background" />
              </td>

              <td className="px-5 py-4">
                <div className="flex gap-4">
                  <div className="h-5 w-5 animate-pulse bg-background" />
                  <div className="h-5 w-5 animate-pulse bg-background" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductsSkeleton;
