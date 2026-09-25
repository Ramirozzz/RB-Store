import type { Product } from "../../types/product";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { GoHeart } from "react-icons/go";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <article className="group">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {product.isBestSeller && (
            <span className="absolute left-3 bottom-3 bg-accent px-2 py-1 text-xs font-medium uppercase tracking-wide text-white">
              Best seller
            </span>
          )}
          <div className="absolute right-3 top-3 z-10 bg-white rounded-full p-1">
            <GoHeart size={18} />
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4 px-2">
          <div>
            <h3 className="text-sm font-bold text-text">{product.name}</h3>

            {/* <p className="mt-1 text-sm text-muted">{product.category.name}</p> */}
            <p className="shrink-0 text-sm font-semibold text-muted mt-1">
              {product.price} kr
            </p>
          </div>

          <HiOutlineShoppingBag size={20} className="text-muted" />
          {/* <p className="shrink-0 text-sm font-medium text-text">
          {product.price} kr
        </p> */}
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
