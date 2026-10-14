const AdminOrdersSkeleton = () => {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-muted">
            <th className="p-4">Order ID</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Email</th>
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
            <th className="p-4">Total</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index} className="border-b border-border">
              <td className="p-4">
                <div className="h-4 w-12 animate-pulse bg-background" />
              </td>

              <td className="p-4">
                <div className="h-4 w-24 animate-pulse bg-background" />
              </td>

              <td className="p-4">
                <div className="h-4 w-36 animate-pulse bg-background" />
              </td>

              <td className="p-4">
                <div className="h-4 w-20 animate-pulse bg-background" />
              </td>

              <td className="p-4">
                <div className="h-7 w-24 animate-pulse rounded-md bg-background" />
              </td>

              <td className="p-4">
                <div className="h-4 w-16 animate-pulse bg-background" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrdersSkeleton;
