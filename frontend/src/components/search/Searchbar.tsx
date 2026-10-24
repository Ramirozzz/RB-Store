import { useProducts } from "../../hooks/useProducts";
import { IoClose } from "react-icons/io5";
import SearchResults from "./SearchResults";
import { useAdminSearchSort } from "../../hooks/useAdminSearchSort";

interface SearchbarProps {
  onClose: () => void;
}
const Searchbar: React.FC<SearchbarProps> = ({ onClose }) => {
  const { search, setSearch, debouncedSearch } = useAdminSearchSort();
  const { data: products, isLoading, isError } = useProducts(debouncedSearch);

  if (!products) return null;

  return (
    <div className="absolute top-8.5 sm:top-9.5 left-1/2 z-50 w-[calc(100%-0rem)] lg:w-[calc(100%-3rem)] -translate-x-1/2 rounded-sm bg-white lg:bg-background">
      <div className="flex items-center justify-between px-5 py-3 ">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search products..."
          autoFocus
          className="w-full bg-transparent text-text outline-none placeholder:text-base font-primary-medium placeholder:text-muted/70"
        />

        <button onClick={onClose} className="ml-5 text-text">
          <IoClose size={22} className="text-muted" />
        </button>
      </div>

      <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto shadow-lg ">
        {debouncedSearch && !isLoading && products && (
          <SearchResults
            products={products}
            search={search}
            isLoading={isLoading}
            isError={isError}
          />
        )}
      </div>
    </div>
  );
};

export default Searchbar;
