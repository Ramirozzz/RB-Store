const AdminCategoriesSkeleton = () => {
  return (
    <div className="rounded-lg bg-white shadow-lg">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border text-left text-sm">
            <th className="px-5 py-4">Name</th>
            <th className="px-5 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index} className="border-b border-border last:border-0">
              <td className="px-5 py-4">
                <div className="h-4 w-32 animate-pulse bg-background" />
              </td>

              <td className="px-5 py-4">
                <div className="flex justify-end gap-4">
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

export default AdminCategoriesSkeleton;
