import { Link } from "react-router-dom";
// import { AiOutlineUser } from "react-icons/ai";
import { PiUser } from "react-icons/pi";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

interface MobileMenuProps {
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  return (
    <div className="absolute top-0 right-0 left-0 z-40 w-full max-h-[calc(100vh-88px)] overflow-y-auto border-t border-border bg-white pb-6 shadow-lg lg:hidden">
      <nav className="flex flex-col ">
        <Link
          to="/"
          onClick={onClose}
          className="border-b border-border px-5 py-4 text-base  uppercase tracking-wider text-text"
        >
          Home
        </Link>
        <Link
          to="/shop"
          onClick={onClose}
          className="border-b border-border px-5 py-4 text-base  uppercase tracking-wider text-text"
        >
          Shop
        </Link>
        <Link
          to="/best-sellers"
          onClick={onClose}
          className="border-b border-border px-5 py-4 text-base  uppercase tracking-wider text-text"
        >
          Best Sellers
        </Link>

        <Link
          to="/wishlist"
          onClick={onClose}
          className="border-b border-border px-5 py-4 text-base  uppercase tracking-wider text-text"
        >
          Wishlist
        </Link>

        <Link
          to="/orders"
          onClick={onClose}
          className="border-b border-border px-5 py-4 text-base  uppercase tracking-wider text-text"
        >
          My Orders
        </Link>
        {/* <Link
          to="/register"
          onClick={onClose}
          className="border-b border-border px-5 py-4 text-base  uppercase tracking-wider text-text"
        >
          Join us
        </Link> */}
      </nav>
      <div className="mt-15 px-5">
        <Link
          to="/login"
          onClick={onClose}
          className="flex items-center gap-2 text-sm uppercase tracking-wider text-text"
        >
          <PiUser size={24} />
          My account <span className="text-muted">( Sign in / sign up )</span>
        </Link>
      </div>

      <div className="mt-6 border-t border-border p-6">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
          Socials
        </p>

        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-text transition hover:text-muted">
            <FaInstagram size={24} />
          </a>

          <a href="#" className="text-sm text-text transition hover:text-muted">
            <FaFacebook size={24} />
          </a>

          <a href="#" className="text-sm text-text transition hover:text-muted">
            <FaTiktok size={24} />
          </a>
          <a href="#" className="text-sm text-text transition hover:text-muted">
            <FaYoutube size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
