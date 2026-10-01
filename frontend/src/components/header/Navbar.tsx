import { useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "../search/Searchbar";
import CartItems from "../cart/CartItems";
import useCartStore from "../../stores/cartStore";
import useWishlistStore from "../../stores/wishlistStore";
import AccountMenu from "../account/AccountMenu";
import { RiSearchLine } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdHeartEmpty } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
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
      <div className="flex items-center justify-center bg-surface px-4 py-1.5 text-center text-xs text-white font-bold">
        <span>Up to 50% sale | shop now</span>
      </div>

      <div className="bg-white border-b border-border px-5 py-4 md:px-10 lg:px-20">
        {/* <div className="grid grid-cols-[1fr_auto_1fr] items-center"> */}
        <div className="flex justify-between items-center">
          <div className="justify-self-center pt-1">
            <Link to={"/"}>
              <span className="text-2xl font-extrabold  sm:text-3xl lg:text-2xl">
                RB STORE
              </span>
            </Link>
          </div>
          {/* Mobile menu */}
          <div className="flex items-center lg:hidden">
            <button type="button" aria-label="Open menu">
              <RxHamburgerMenu size={20} />
            </button>
          </div>

          {/* Desktop */}
          <div className="hidden justify-self-start lg:block">
            <ul className="flex items-center gap-5 text-sm text-text uppercase">
              <li>Home</li>
              <li>Shop</li>
              <li>Best Sellers</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="justify-self-end">
            <div className="flex items-center gap-1 text-muted sm:gap-4 lg:gap-4">
              <button
                onClick={() => setSearchBarOpen(true)}
                className="cursor-pointer"
                aria-label="Search"
              >
                <RiSearchLine size={24} />
              </button>

              <AccountMenu />

              <Link to={"/wishlist"}>
                <button
                  className="relative hidden sm:block cursor-pointer"
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
                  <sup className="absolute -right-2.5 -top-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-surface px-1 text-[11px] font-medium text-white">
                    {cartItemsCount}
                  </sup>
                )}
              </button>
            </div>
          </div>
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
