import { useProducts } from "../../hooks/useProducts";
import ErrorState from "../states/ErrorState";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductsListProps {
  selectedCategory: number | null;
  sort: string;
}

const ProductsList: React.FC<ProductsListProps> = ({
  selectedCategory,
  sort,
}) => {
  const { data: products, isLoading, isError } = useProducts(undefined, sort);

  if (isError) {
    return <ErrorState message="Could not load products." />;
  }

  // if (!products) return null;

  const filteredProducts = products?.filter(
    (product) =>
      selectedCategory === null || product.categoryId === selectedCategory,
  );

  return (
    <div className="mx-auto px-4 py-8 sm:px-8 lg:px-10 xl:px-15 pb-25">
      <span className="text-sm text-muted">
        Showing {filteredProducts?.length}{" "}
        {filteredProducts?.length === 1 ? "product" : "products"}
      </span>

      {isLoading ? (
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredProducts?.length === 0 ? (
        <div className="flex min-h-[200px] w-full items-center justify-center">
          <p className="text-base text-text">
            No products found in this category.
          </p>
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
          {filteredProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
