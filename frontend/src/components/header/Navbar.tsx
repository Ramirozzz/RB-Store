import { useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "../search/Searchbar";
import CartItems from "../cart/CartItems";
import useCartStore from "../../stores/cartStore";
import useWishlistStore from "../../stores/wishlistStore";
import AccountMenu from "../account/AccountMenu";
import MobileMenu from "./MobileMenu";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
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
    <nav className="fixed top-0 z-50 w-full">
      <div className="flex items-center justify-center bg-surface px-4 py-1.5 text-center text-xs text-white">
        <span>Up to 50% sale | shop now</span>
      </div>

      <div className="bg-white border-b border-border px-4 py-3.5 lg:py-4 sm:px-8 lg:px-10 xl:px-15">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
          {/* Mobile menu */}
          <div className="flex items-center justify-self-start gap-3.5 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <IoClose size={28} /> : <VscMenu size={25} />}
            </button>
            <button
              onClick={() => setSearchBarOpen(true)}
              className="block lg:hidden cursor-pointer text-muted"
              aria-label="Search"
            >
              <CiSearch size={25} strokeWidth={0.5} />
            </button>
          </div>

          <div className="justify-self-center lg:justify-self-start">
            <Link to={"/"}>
              <span className="text-2xl font-primary-bold italic tracking-tight sm:text-3xl lg:text-2xl">
                RB STORE
              </span>
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden justify-self-start lg:block">
            <ul className="flex items-center gap-5 text-sm  text-text uppercase">
              <li>Shop</li>
              <li>Best Sellers</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="justify-self-end pr-1 lg:pr-0">
            <div className="flex items-center gap-3.5 text-muted sm:gap-4 lg:gap-4">
              <button
                onClick={() => setSearchBarOpen(true)}
                className="hidden lg:block cursor-pointer"
                aria-label="Search"
              >
                <CiSearch size={25} strokeWidth={0.5} />
              </button>

              <AccountMenu />

              <Link to={"/wishlist"} className="flex items-center">
                <button
                  className="relative  cursor-pointer"
                  aria-label="Open wishlist"
                >
                  <IoMdHeartEmpty size={25} />
                  {wishlistItemsCount > 0 && (
                    <sup className="absolute -right-2.5 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-surface px-1 text-[11px] font-medium text-white">
                      {wishlistItemsCount}
                    </sup>
                  )}
                </button>
              </Link>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative cursor-pointer"
                aria-label="Open cart"
              >
                <HiOutlineShoppingBag size={24} />
                {cartItemsCount > 0 && (
                  <sup className="absolute -right-2 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-surface px-1 text-[11px] font-medium text-white">
                    {cartItemsCount}
                  </sup>
                )}
              </button>
            </div>
          </div>
        </div>
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
