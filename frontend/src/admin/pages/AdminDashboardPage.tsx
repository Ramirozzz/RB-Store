import ErrorState from "../../components/states/ErrorState";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";
import AdminDashboardCard from "../components/cards/AdminDashboardCard";
import {
  HiOutlineShoppingBag,
  HiOutlineClipboardDocumentList,
  HiOutlineUsers,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";

const AdminDashboardPage = () => {
  const { data, isLoading, isError } = useAdminDashboard();

  if (isLoading) {
    return <p className="text-sm text-muted">Loading dashboard...</p>;
  }

  if (isError || !data) {
    return <ErrorState message="Could not load dashboard data." />;
  }

  return (
    <div>
      <h1 className=" text-2xl">Dashboard</h1>

      <p className="mt-2 text-sm text-muted">Overview of your store.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminDashboardCard
          title="Products"
          data={data.totalProducts}
          icon={<HiOutlineShoppingBag size={35} />}
        />
        <AdminDashboardCard
          title="Orders"
          data={data.totalOrders}
          icon={<HiOutlineClipboardDocumentList size={35} />}
        />
        <AdminDashboardCard
          title="Customers"
          data={data.totalCustomers}
          icon={<HiOutlineUsers size={35} />}
        />
        <AdminDashboardCard
          title="Low Stock"
          data={data.lowStockProducts}
          icon={<HiOutlineExclamationTriangle size={35} />}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
