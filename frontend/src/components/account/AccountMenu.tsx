import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import LoadingOverlay from "../LoadingSpinners/LoadingOverlay";
import { GoHeart } from "react-icons/go";
import { AiOutlineLogout } from "react-icons/ai";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { LiaUser } from "react-icons/lia";
import { FiX } from "react-icons/fi";
import { HiOutlineShieldCheck } from "react-icons/hi2";

const AccountMenu = () => {
  const [accountOpen, setAccountOpen] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggingOut(true);
    setAccountOpen(false);

    setTimeout(() => {
      logout();

      setIsLoggingOut(false);
      navigate("/");
    }, 500);
  };

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            if (!isAuthenticated) {
              navigate("/login");
              return;
            }

            setAccountOpen(!accountOpen);
          }}
          className="cursor-pointer"
          aria-label="Open account menu"
        >
          {isAuthenticated ? (
            <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-accent text-sm text-white">
              {user?.name.slice(0, 1).toUpperCase()}
            </span>
          ) : (
            <LiaUser size={26} className="mt-1" />
          )}
        </button>

        <div
          className={`absolute right-0 top-full z-50 mt-3 w-60 origin-top-right border border-border bg-white p-2 shadow-lg transition-all duration-200 ease-out ${
            accountOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-1 scale-95 opacity-0 pointer-events-none"
          }`}
        >
          {isAuthenticated && (
            <div>
              <div className="relative border-b border-border px-3 py-3">
                <button
                  onClick={() => setAccountOpen(false)}
                  className="absolute top-0.5 right-1 cursor-pointer"
                >
                  <FiX size={18} />
                </button>

                <p className="text-sm font-primary text-text font-bold">
                  {user?.name}
                </p>

                <p className="mt-1 text-sm text-muted">{user?.email}</p>
              </div>

              <Link
                to="/orders"
                onClick={() => setAccountOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 pt-3 text-sm text-text hover:bg-neutral-100"
              >
                <HiOutlineClipboardDocumentList
                  size={17}
                  className="text-muted"
                />
                My orders
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setAccountOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-text hover:bg-neutral-100"
              >
                <GoHeart size={17} className="text-muted" />
                Wishlist
              </Link>

              {(user?.role === "Admin" || user?.role === "Demo") && (
                <Link
                  to="/admin"
                  onClick={() => setAccountOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-text hover:bg-neutral-100"
                >
                  <HiOutlineShieldCheck size={17} className="text-muted" />
                  Admin Dashboard
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 w-full cursor-pointer px-3 py-2.5 text-left text-sm text-text hover:bg-neutral-100"
              >
                <AiOutlineLogout size={17} className="text-muted" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <LoadingOverlay isVisible={isLoggingOut} />
    </>
  );
};

export default AccountMenu;
