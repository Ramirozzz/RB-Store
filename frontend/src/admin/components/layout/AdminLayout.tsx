import { Outlet } from "react-router-dom";
import AdminSidebar from "../header/AdminSidebar";
import AdminHeaderMobile from "../header/AdminHeaderMobile";
import AdminHeader from "../header/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background-light">
      {/* Header Mobile */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-white px-5 lg:hidden">
        <AdminHeaderMobile />
      </header>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-white lg:block">
        <AdminSidebar />
      </aside>

      <div className="pt-16 lg:ml-64 lg:pt-0">
        <div className="fixed right-0 top-0 z-30 hidden h-16 bg-white lg:block lg:left-64">
          <AdminHeader />
        </div>

        <main className="min-w-0 p-5 pt-20 sm:p-8 sm:pt-24 lg:pt-24">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
