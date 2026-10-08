import { Outlet } from "react-router-dom";
// import { HiOutlineBars3 } from "react-icons/hi2";
import AdminSidebar from "../header/AdminSidebar";
import AdminHeaderMobile from "../header/AdminHeaderMobile";
import AdminHeader from "../header/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background-light">
      {/* Header mobile */}
      <header className="flex items-center justify-between border-b border-border bg-white px-5 py-4 lg:hidden">
        <AdminHeaderMobile />
      </header>

      <div className="flex min-h-[calc(100vh-65px)] lg:min-h-screen">
        {/* Desktop */}
        <div className="hidden lg:block w-64 bg-white border-r border-border">
          <AdminSidebar />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader />

          <main className="flex-1 p-5 sm:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
