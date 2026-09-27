import type { Product } from "../../types/product";
import { GoHeart } from "react-icons/go";
import { FaArrowLeftLong } from "react-icons/fa6";
import useCartStore from "./../../stores/cartStore";

interface ProductProps {
  product: Product;
}

const ProductDetails: React.FC<ProductProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 pt-40">
      <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-16">
        <button className="absolute top-5 -left-7 flex items-center gap-2 bg-white text-xs font-normal shadow-xl py-2 px-2">
          <FaArrowLeftLong size={13} className="text-muted" />{" "}
          <span>Go Back</span>
        </button>
        <div className="aspect-square overflow-hidden bg-neutral-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-muted font-medium  ">
            {product.category.name}
          </p>

          <h1 className="mt-3 text-4xl font-bold uppercase tracking-tight lg:text-4xl">
            {product.name}
          </h1>

          <p className="mt-6 text-xl font-bold">{product.price} kr</p>

          <p className="mt-8 max-w-lg leading-7 text-muted font-medium">
            {product.description}
          </p>

          <div className="mt-10 border-t border-border pt-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => addToCart(product)}
                className="h-13 w-full bg-bg text-base font-medium uppercase tracking-wide text-white transition hover:opacity-90"
                aria-label="Add to wishlist"
              >
                Add to cart
              </button>

              <button
                className="flex h-13 w-13 shrink-0 items-center justify-center border border-bg "
                aria-label="Add to wishlist"
              >
                <GoHeart
                  size={23}
                  className="text-muted transition group-hover:text-white"
                />
              </button>
            </div>
            <div className="mt-4">
              {product.stockQuantity > 5 ? (
                <span className="text-sm text-green-600 font-semibold">
                  {product.stockQuantity} left in stock
                </span>
              ) : (
                <span className="text-sm text-red-500 font-semibold">
                  Only {product.stockQuantity} left in stock
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
