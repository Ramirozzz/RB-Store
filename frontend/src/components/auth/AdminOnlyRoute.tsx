import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

const AdminOnlyRoute = () => {
  const user = useAuthStore((state) => state.user);

  if (user?.role !== "Admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default AdminOnlyRoute;
