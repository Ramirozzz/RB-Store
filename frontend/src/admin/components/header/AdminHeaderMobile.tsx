import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { HiOutlineBars3 } from "react-icons/hi2";

const AdminHeaderMobile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <span className="text-xl font-primary-bold italic uppercase tracking-tight sm:text-3xl lg:text-[1.4rem]">
        Rb Eyewear
      </span>

      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="cursor-pointer"
        aria-label="Open admin menu"
      >
        <HiOutlineBars3 size={24} />
      </button>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="relative h-full w-64 bg-white">
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHeaderMobile;
