import { useAdminUsers } from "../../hooks/useAdminUsers";
import ErrorState from "../../components/states/ErrorState";
import AdminUsersSkeleton from "../AdminSkeletons/AdminUsersSkeleton";

const AdminUsersPage = () => {
  const { data: users, isLoading, isError } = useAdminUsers();

  const sortedUsers = [...(users ?? [])].sort((a, b) => {
    const roleOrder: Record<string, number> = {
      Admin: 0,
      Demo: 1,
      User: 2,
    };

    return (roleOrder[a.role] ?? 3) - (roleOrder[b.role] ?? 3);
  });

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl">Users</h1>
        <p className="mt-1 text-sm text-muted">
          Manage and view registered users.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg bg-white rounded-sm">
        <p className="text-sm text-muted p-4 ">
          Total customers: {users?.length ?? 0}
        </p>
        {isLoading ? (
          <AdminUsersSkeleton />
        ) : isError || !users ? (
          <ErrorState message="Could not load users." />
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border ">
              <tr>
                <th className="px-4 py-4">Name</th>
                <th className="px-4 py-4">Email</th>
                <th className="px-4 py-4">Role</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border bg-white">
              {sortedUsers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-muted">
                    No users found.
                  </td>
                </tr>
              ) : (
                sortedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/90">
                    <td className="px-4 py-4">{user.name}</td>
                    <td className="px-4 py-4">{user.email}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs ${
                          user.role === "Admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AdminUsersPage;
