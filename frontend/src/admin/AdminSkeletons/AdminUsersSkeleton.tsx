const AdminUsersSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[500px] text-left text-sm">
        <thead className="border-b border-border">
          <tr>
            <th className="px-4 py-4">Name</th>
            <th className="px-4 py-4">Email</th>
            <th className="px-4 py-4">Role</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-border">
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index}>
              <td className="px-4 py-4">
                <div className="h-4 w-24 animate-pulse bg-background" />
              </td>

              <td className="px-4 py-4">
                <div className="h-4 w-40 animate-pulse bg-background" />
              </td>

              <td className="px-4 py-4">
                <div className="h-6 w-14 animate-pulse rounded-full bg-background" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersSkeleton;
