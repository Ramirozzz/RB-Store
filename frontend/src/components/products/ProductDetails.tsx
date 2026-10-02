import type { Product } from "../../types/product";
import { useNavigate } from "react-router-dom";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { FaArrowLeftLong } from "react-icons/fa6";
import useCartStore from "./../../stores/cartStore";
import { GoDotFill } from "react-icons/go";
import useToastStore from "../../stores/ToastStore";
import useWishlistStore from "../../stores/wishlistStore";

interface ProductProps {
  product: Product;
}

const ProductDetails: React.FC<ProductProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const wishlistItems = useWishlistStore((state) => state.items);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const showToast = useToastStore((state) => state.showToast);

  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-10 pt-40">
      <div className="flex items-center gap-2 mb-4 text-sm text-text">
        <span>Home</span>
        <span>/</span>
        <span> {product.category.name}</span>
        <span>/</span>
        <span className="text-accent">{product.name}</span>
      </div>
      <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-16">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 -left-4 md:-left-7 flex items-center gap-2 bg-white text-xs font-normal shadow-xl py-2 px-2"
        >
          <FaArrowLeftLong size={13} className="text-muted" />{" "}
          <span>Go Back</span>
        </button>
        <div className="aspect-square overflow-hidden bg-background">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-xs uppercase tracking-widest text-muted">
            {product.category.name}
          </span>

          <h1 className="mt-3 text-4xl uppercase lg:text-5xl">
            {product.name}
          </h1>

          <span className="mt-5 text-xl ">{product.price.toFixed(2)} kr</span>

          <p className="mt-6 max-w-lg leading-6 text-muted">
            {product.description}
          </p>

          <div className="mt-8 border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  addToCart(product);
                  showToast(`${product.name} Added to cart`, "success");
                }}
                className="h-13 w-full bg-surface text-base uppercase tracking-wide text-white transition-all duration-300 hover:opacity-90"
                aria-label="Add to wishlist"
              >
                Add to cart
              </button>

              <button
                className="flex h-13 w-13 shrink-0 items-center justify-center border border-bg transition-all duration-300 "
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                onClick={() => {
                  isWishlisted
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product);
                }}
              >
                {isWishlisted ? (
                  <GoHeartFill size={23} />
                ) : (
                  <GoHeart
                    size={23}
                    className="text-muted transition hover:text-text"
                  />
                )}
              </button>
            </div>
            <div className="mt-4">
              {product.stockQuantity > 5 ? (
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <GoDotFill size={16} />
                  {product.stockQuantity} left in stock
                </span>
              ) : (
                <span className="text-sm text-red-500">
                  <GoDotFill /> Only {product.stockQuantity} left in stock
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
