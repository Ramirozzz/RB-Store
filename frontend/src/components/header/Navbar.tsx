import { useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "../search/Searchbar";
import CartItems from "../cart/CartItems";
import useCartStore from "../../stores/cartStore";
import useWishlistStore from "../../stores/wishlistStore";
import AccountMenu from "../account/AccountMenu";
import MobileMenu from "./MobileMenu";
import { HiOutlineShoppingBag } from "react-icons/hi2";
// import { IoMdHeartEmpty } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
// import { CiSearch } from "react-icons/ci";
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
    <nav className="fixed top-0 z-50 w-full bg-white pt-1.5">
      <div className="flex items-center justify-center bg-surface px-4 py-1.5 text-center text-xs text-white ">
        <span>Up to 50% sale | shop now</span>
      </div>

      <div className="border-b border-border bg-white px-4 py-3.5 sm:px-8 lg:px-10 lg:py-4.5 xl:px-15">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="lg:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <IoClose size={28} /> : <VscMenu size={25} />}
            </button>

            <Link to="/">
              <span className="text-xl font-primary-bold italic uppercase tracking-tight sm:text-3xl lg:text-[1.45rem]">
                Rb Eyewear
              </span>
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-5 text-sm uppercase text-text">
              <Link to="/shop">
                <li>Shop</li>
              </Link>
              <Link to="/best-sellers">
                <li>Best Sellers</li>
              </Link>

              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="flex items-center gap-3.5 text-muted sm:gap-4">
            <button
              type="button"
              onClick={() => setSearchBarOpen(true)}
              className="flex h-6 w-6 cursor-pointer items-center justify-center"
              aria-label="Search"
            >
              <GoSearch size={25} strokeWidth={0.1} />
            </button>

            <div className="flex h-6 w-6 items-center justify-center">
              <AccountMenu />
            </div>

            <Link
              to="/wishlist"
              className="relative flex h-6 w-6 cursor-pointer items-center justify-center"
              aria-label="Open wishlist"
            >
              <FiHeart size={25} strokeWidth={1.5} color="#000000" />

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
              <HiOutlineShoppingBag size={25} color="#000000" />

              {cartItemsCount > 0 && (
                <sup className="absolute -right-2 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-surface px-1 text-[11px] font-medium text-white">
                  {cartItemsCount}
                </sup>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <MobileMenu onClose={() => setMobileMenuOpen(false)} />
        )}

        {isSearchBarOpen && (
          <Searchbar onClose={() => setSearchBarOpen(false)} />
        )}
      </div>

      <CartItems isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
