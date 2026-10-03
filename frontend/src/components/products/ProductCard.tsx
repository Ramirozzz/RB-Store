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
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist,
  );
  const showToast = useToastStore((state) => state.showToast);

  const wishlistItems = useWishlistStore((state) => state.items);

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  return (
    <article className="group ">
      <Link to={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-background">
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {product.isBestSeller && (
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

          {/* <p className="mt-1 text-sm text-muted">{product.category.name}</p> */}
          <p className="shrink-0 text-sm text-muted font-bold mt-1">
            {product.price.toFixed(2)} kr
          </p>
        </div>

        <HiOutlineShoppingBag
          onClick={() => {
            addToCart(product);
            showToast(`${product.name} Added to cart`, "success");
          }}
          size={22}
          className="text-muted cursor-pointer hover:text-surface"
        />
        {/* <p className="shrink-0 text-sm font-medium text-text">
          {product.price} kr
        </p> */}
      </div>
    </article>
  );
};

export default ProductCard;
