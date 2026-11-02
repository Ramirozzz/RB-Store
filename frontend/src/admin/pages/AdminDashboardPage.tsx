import ErrorState from "../../components/states/ErrorState";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";
import AdminDashboardSkeleton from "../AdminSkeletons/AdminDashboardSkeleton";
import AdminDashboardCard from "../components/dashboard-Home/AdminDashboardCard";
import {
  HiOutlineShoppingBag,
  HiOutlineSquares2X2,
  HiOutlineClipboardDocumentList,
  HiOutlineUsers,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import RecentOrders from "../components/dashboard-Home/RecentOrders";
import QuickActions from "../components/dashboard-Home/QuickActions";

const AdminDashboardPage = () => {
  const { data, isLoading, isError } = useAdminDashboard();

  return (
    <section>
      <h1 className=" text-2xl">Dashboard</h1>

      <p className="mt-2 text-sm text-muted">Overview of your store.</p>

      {isLoading ? (
        <AdminDashboardSkeleton />
      ) : isError || !data ? (
        <ErrorState message="Could not load dashboard data." />
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AdminDashboardCard
            title="Products"
            data={data.totalProducts}
            icon={<HiOutlineShoppingBag size={35} />}
          />
          <AdminDashboardCard
            title="Categories"
            data={data.totalCategories}
            icon={<HiOutlineSquares2X2 size={35} />}
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
            icon={<HiOutlineExclamationTriangle size={35} color="#f59e0b" />}
          />
        </div>
      )}
      <QuickActions />
      <RecentOrders />
    </section>
  );
};

export default AdminDashboardPage;
