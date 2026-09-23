import { useProducts } from "../../hooks/useProducts";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductsList = () => {
  const { data: products, isLoading, isError } = useProducts();

  if (isError) {
    return <p>Could not load products.</p>;
  }
  return (
    <div className="mx-auto px-5 sm:px-8 lg:px-20 py-15">
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-12">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default ProductsList;
