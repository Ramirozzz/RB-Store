import { NavLink } from "react-router-dom";
import {
  HiOutlineChartBar,
  HiOutlineShoppingBag,
  HiOutlineTag,
  HiOutlineClipboardDocumentList,
  HiOutlineUsers,
  HiOutlineXMark,
} from "react-icons/hi2";

interface AdminSidebarProps {
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
  return (
    <aside className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <span className="text-xl font-primary-bold italic uppercase tracking-tight sm:text-3xl lg:text-[1.4rem]">
          Rb Eyewear
        </span>

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

      <nav className="p-3">
        <NavLink
          to="/admin"
          end
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 text-sm"
        >
          <HiOutlineChartBar size={19} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 text-sm"
        >
          <HiOutlineShoppingBag size={19} />
          Products
        </NavLink>

        <NavLink
          to="/admin/categories"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 text-sm"
        >
          <HiOutlineTag size={19} />
          Categories
        </NavLink>

        <NavLink
          to="/admin/orders"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 text-sm"
        >
          <HiOutlineClipboardDocumentList size={19} />
          Orders
        </NavLink>

        <NavLink
          to="/admin/customers"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 text-sm"
        >
          <HiOutlineUsers size={19} />
          Customers
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
