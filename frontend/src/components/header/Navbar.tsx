import { IoIosSearch } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoHeart } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full">
      <div className="flex items-center justify-center bg-bg px-4 py-1.5 text-center text-xs text-white">
        <span>Up to 50% sale | shop now</span>
      </div>

      <div className="border-b border-border px-5 py-3 md:px-10 lg:px-20">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Mobile menu */}
          <div className="flex items-center lg:hidden">
            <button type="button" aria-label="Open menu">
              <RxHamburgerMenu size={20} />
            </button>
          </div>

          {/* Desktop */}
          <div className="hidden justify-self-start lg:block">
            <ul className="flex items-center gap-5 text-sm uppercase text-muted">
              <li>Shop</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Logo */}
          <div className="justify-self-center">
            <span className="text-2xl font-bold font-secondary sm:text-3xl lg:text-4xl">
              RB STORE
            </span>
          </div>

          <div className="justify-self-end">
            <div className="flex items-center gap-3 text-muted sm:gap-4 lg:gap-5">
              <IoIosSearch className="hidden sm:block" size={24} />
              <AiOutlineUser size={24} />
              <HiOutlineShoppingBag size={24} />
              <GoHeart className="hidden sm:block" size={24} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
