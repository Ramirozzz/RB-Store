import type { Product } from "../../types/product";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import useCartStore from "../../stores/cartStore";
import useWishlistStore from "../../stores/wishlistStore";
import useToastStore from "../../stores/ToastStore";

interface ProductCardProps {
  product: Product;
  showIsBestSeller?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showIsBestSeller = true,
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );
  const showToast = useToastStore((state) => state.showToast);

  const wishlistItems = useWishlistStore((state) => state.items);

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const productImage = product.imageUrl || "/products/placeholder-product.jpg";

  return (
    <article className="group ">
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-background">
          <img
            src={productImage}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/images/products/placeholder-product.jpg";
            }}
          />

          {showIsBestSeller && product.isBestSeller && (
            <span className="absolute left-2 bottom-3 bg-accent px-2 py-1 text-xs uppercase tracking-wide text-white">
              Best seller
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              isWishlisted
                ? removeFromWishlist(product.id)
                : addToWishlist(product);
            }}
            className="absolute right-3 top-3 z-10 bg-white rounded-full p-1"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            {isWishlisted ? <GoHeartFill size={22} /> : <GoHeart size={22} />}
          </button>
        </div>
      </Link>

      <div className="mt-3 flex items-start justify-between gap-4 px-2">
        <div>
          <h3 className="text-sm text-text">{product.name}</h3>

          <div className="flex items-center gap-4 mt-1 ">
            <p className="shrink-0 text-sm text-muted">
              {product.price.toFixed(2)} kr
            </p>

            <span className="text-xs md:text-sm text-red-600">
              {product.stockQuantity === 0 ? "Sold Out" : ""}
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={product.stockQuantity === 0}
          onClick={() => {
            addToCart(product);
            showToast(`${product.name} added to cart`, "success");
          }}
          className="cursor-pointer text-muted transition hover:text-surface disabled:cursor-not-allowed "
          aria-label={
            product.stockQuantity === 0 ? "Out of stock" : "Add to cart"
          }
        >
          <HiOutlineShoppingBag size={22} />
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
