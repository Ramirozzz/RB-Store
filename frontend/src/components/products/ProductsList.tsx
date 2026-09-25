import { useProducts } from "../../hooks/useProducts";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductsListProps {
  selectedCategory: number | null;
}

const ProductsList: React.FC<ProductsListProps> = ({ selectedCategory }) => {
  const { data: products, isLoading, isError } = useProducts();

  if (isError) {
    return <p>Could not load products.</p>;
  }

  if (!products) return null;

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === null || product.categoryId === selectedCategory,
  );

  return (
    <div className="mx-auto px-5 sm:px-8 lg:px-20 py-15">
      {filteredProducts.length === 0 && (
        <div className="flex justify-center items-center w-full min-h-[200px] ">
          <p className="text-base text-text">
            No products found in this category.
          </p>
        </div>
      )}
      <div className="grid grid-cols-2 gap-x-4 gap-y-10  sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default ProductsList;
