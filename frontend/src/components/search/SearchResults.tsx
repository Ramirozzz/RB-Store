import type { Product } from "../../types/product";
import ProductCard from "../products/ProductCard";
import { ClipLoader } from "react-spinners";
import ErrorState from "../states/ErrorState";

interface SearchResultsProps {
  products: Product[];
  search: string;
  isLoading: boolean;
  isError: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  products,
  search,
  isLoading,
  isError,
}) => {
  if (isLoading) {
    return (
      <div className="flex min-h-[100px] items-center justify-center bg-white px-5 py-8 lg:px-8">
        <ClipLoader color="#000000" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white px-5 py-8 lg:px-8">
        <ErrorState message="Something went wrong while searching." />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[100px] items-center justify-center bg-white px-5 py-8 lg:px-8">
        <p className="text-sm font-bold">No results found for "{search}"</p>
      </div>
    );
  }

  return (
    <div className="bg-white px-5 py-8 lg:px-8">
      <span className="text-sm text-muted">
        {products.length} {products.length === 1 ? "product" : "products"} found
      </span>

      <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
