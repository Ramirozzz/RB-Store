import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Searchbar from "../search/Searchbar";
import CartItems from "../cart/CartItems";
import useCartStore from "../../stores/cartStore";
import useWishlistStore from "../../stores/wishlistStore";
import AccountMenu from "../account/AccountMenu";
import MobileMenu from "./MobileMenu";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FiHeart } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { VscMenu } from "react-icons/vsc";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchBarOpen, setSearchBarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items);

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const wishlistItemsCount = wishlistItems.length;

  return (
    <nav className="fixed top-0 z-50 w-full bg-white">
      <div className="bg-surface px-4 py-2 text-center text-xs text-white uppercase">
        <span>See it your way | Shop now</span>
      </div>

      <div className="border-b border-border bg-white px-4 py-3.5 sm:px-7 lg:px-10 lg:py-5 xl:px-15">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden text-text"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <IoClose size={25} /> : <VscMenu size={24} />}
            </button>

            <Link to="/">
              <span className="text-xl font-primary-bold italic uppercase tracking-tight sm:text-3xl lg:text-[1.25rem]">
                Rb Eyewear
              </span>
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-5 text-sm uppercase text-text">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-current after:transition-transform after:duration-300 after:ease-out ${
                    isActive
                      ? "after:scale-x-100"
                      : "after:scale-x-0 after:origin-left hover:after:scale-x-100"
                  }`
                }
              >
                <li>Home</li>
              </NavLink>

              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-current after:transition-transform after:duration-300 after:ease-out ${
                    isActive
                      ? "after:scale-x-100"
                      : "after:scale-x-0 after:origin-left hover:after:scale-x-100"
                  }`
                }
              >
                <li>Shop</li>
              </NavLink>
              <NavLink
                to="/best-sellers"
                className={({ isActive }) =>
                  `relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-current after:transition-transform after:duration-300 after:ease-out ${
                    isActive
                      ? "after:scale-x-100"
                      : "after:scale-x-0 after:origin-left hover:after:scale-x-100"
                  }`
                }
              >
                <li>Best Sellers</li>
              </NavLink>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-current after:transition-transform after:duration-300 after:ease-out ${
                    isActive
                      ? "after:scale-x-100"
                      : "after:scale-x-0 after:origin-left hover:after:scale-x-100"
                  }`
                }
              >
                <li>My Orders</li>
              </NavLink>
            </ul>
          </div>

          <div className="flex items-center gap-3 text-text sm:gap-4">
            <button
              type="button"
              onClick={() => setSearchBarOpen(true)}
              className="flex h-6 w-6 cursor-pointer items-center justify-center"
              aria-label="Search"
            >
              <GoSearch size={23} strokeWidth={0.3} className="text-muted" />
            </button>

            <div className="flex h-6 w-6 items-center justify-center">
              <AccountMenu />
            </div>

            <Link
              to="/wishlist"
              className="relative flex h-6 w-6 cursor-pointer items-center justify-center"
              aria-label="Open wishlist"
            >
              <FiHeart size={23} strokeWidth={1.5} />

              {wishlistItemsCount > 0 && (
                <sup className="absolute -right-2.5 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-surface px-1 text-[11px] font-medium text-white">
                  {wishlistItemsCount}
                </sup>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex h-6 w-6 cursor-pointer items-center justify-center"
              aria-label="Open cart"
            >
              <HiOutlineShoppingBag size={23} />

              {cartItemsCount > 0 && (
                <sup className="absolute -right-2 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-surface px-1 text-[11px] font-medium text-white">
                  {cartItemsCount}
                </sup>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`slide-animation ${
            mobileMenuOpen ? "slide-open" : "slide-from-left"
          } absolute top-full right-0 left-0 z-40 w-full bg-white`}
        >
          <MobileMenu onClose={() => setMobileMenuOpen(false)} />
        </div>

        {isSearchBarOpen && (
          <Searchbar onClose={() => setSearchBarOpen(false)} />
        )}
      </div>

      <CartItems isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
