import { Link } from "react-router-dom";
import { GoHeart } from "react-icons/go";
import useWishlistStore from "../stores/wishlistStore";
import ProductCard from "../components/products/ProductCard";

const WishlistPage = () => {
  const wishlistItems = useWishlistStore((state) => state.items);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-20 pt-30 sm:px-8 lg:px-20">
      <div className="flex items-end justify-between border-b border-border pb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Saved for later
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Wishlist
          </h1>
        </div>

        {wishlistItems.length > 0 && (
          <span className="text-sm text-muted">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"}
          </span>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <GoHeart size={32} className="text-muted" />

          <h2 className="mt-5 text-lg font-semibold text-text">
            Your wishlist is empty
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
            Save your favorite sunglasses here and come back to them later.
          </p>

          <Link
            to="/"
            className="mt-6 bg-black px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-neutral-800"
          >
            Discover sunglasses
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
