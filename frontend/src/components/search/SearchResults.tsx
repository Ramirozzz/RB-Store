import type { Product } from "../../types/product";
import ProductCard from "../products/ProductCard";
import { ClipLoader } from "react-spinners";

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
  {
    isError && (
      <p className="p-8 text-sm text-muted">
        Something went wrong while searching.
      </p>
    );
  }
  return (
    <div className="bg-white px-5 lg:px-8 py-8 ">
      {isLoading && (
        <div className="flex min-h-[100px] items-center justify-center">
          <ClipLoader color="#000000" />
        </div>
      )}

      {!isLoading && products.length === 0 ? (
        <div className="flex min-h-[100px] items-center justify-center">
          <p className="text-sm font-bold">No results found for "{search}"</p>
        </div>
      ) : (
        !isLoading &&
        products.length > 0 && (
          <>
            <span className="text-sm text-muted">
              {products.length} {products.length === 1 ? "product" : "products"}{" "}
              found
            </span>

            <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default SearchResults;
