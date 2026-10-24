import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineChartBar,
  HiOutlineShoppingBag,
  HiOutlineClipboardDocumentList,
  HiOutlineUsers,
  HiOutlineXMark,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import { AiOutlineLogout } from "react-icons/ai";
import useAuthStore from "../../../stores/authStore";
import LoadingOverlay from "../../../components/LoadingSpinners/LoadingOverlay";

interface AdminSidebarProps {
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      logout();
      navigate("/login");
    }, 500);
  };

  return (
    <aside className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <Link to={"/"}>
          <span className="text-xl font-primary-bold italic uppercase tracking-tight sm:text-3xl lg:text-[1.25rem]">
            Rb Eyewear
          </span>
        </Link>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer lg:hidden"
            aria-label="Close admin menu"
          >
            <HiOutlineXMark size={22} />
          </button>
        )}
      </div>

      <nav className="p-3 w-full">
        <NavLink
          to="/admin"
          end
          onClick={onClose}
          className={({ isActive }) =>
            ` flex items-center gap-3 px-3 py-2 text-sm rounded-sm mt-1 transition ${
              isActive
                ? "bg-neutral-100 underline underline-offset-3"
                : "hover:bg-neutral-100 "
            }`
          }
        >
          <HiOutlineChartBar size={19} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          onClick={onClose}
          className={({ isActive }) =>
            ` flex items-center gap-3 px-3 py-2 text-sm rounded-sm mt-1 transition ${
              isActive
                ? "bg-neutral-100 underline underline-offset-3"
                : "hover:bg-neutral-100 "
            }`
          }
        >
          <HiOutlineShoppingBag size={19} />
          Products
        </NavLink>

        <NavLink
          to="/admin/categories"
          onClick={onClose}
          className={({ isActive }) =>
            ` flex items-center gap-3 px-3 py-2 text-sm rounded-sm mt-1 transition ${
              isActive
                ? "bg-neutral-100 underline underline-offset-3"
                : "hover:bg-neutral-100 "
            }`
          }
        >
          <HiOutlineSquares2X2 size={19} />
          Categories
        </NavLink>

        <NavLink
          to="/admin/orders"
          onClick={onClose}
          className={({ isActive }) =>
            ` flex items-center gap-3 px-3 py-2 text-sm rounded-sm mt-1 transition ${
              isActive
                ? "bg-neutral-100 underline underline-offset-3"
                : "hover:bg-neutral-100 "
            }`
          }
        >
          <HiOutlineClipboardDocumentList size={19} />
          Orders
        </NavLink>

        <NavLink
          to="/admin/customers"
          onClick={onClose}
          className={({ isActive }) =>
            ` flex items-center gap-3 px-3 py-2 text-sm rounded-sm mt-1 transition ${
              isActive
                ? "bg-neutral-100 underline underline-offset-3"
                : "hover:bg-neutral-100 "
            }`
          }
        >
          <HiOutlineUsers size={19} />
          Customers
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-sm mt-1 hover:bg-neutral-100 "
        >
          <AiOutlineLogout size={19} />
          Log out
        </button>
      </nav>
      <LoadingOverlay isVisible={isLoggingOut} />
    </aside>
  );
};

export default AdminSidebar;
