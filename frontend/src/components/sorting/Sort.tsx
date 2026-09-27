import { RiSortDesc } from "react-icons/ri";

interface SortProps {
  sort: string;
  onSort: (sort: string) => void;
}

const Sort: React.FC<SortProps> = ({ sort, onSort }) => {
  return (
    <div className="relative">
      <select
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        className="cursor-pointer appearance-none border border-border bg-white py-3 pl-4 pr-10 text-xs font-bold uppercase tracking-wider text-text outline-none transition hover:border-black"
      >
        <option className="bg-white text-text" value="">
          Sort by
        </option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Name: A-Z</option>
        <option value="name-desc">Name: Z-A</option>
      </select>

      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <RiSortDesc />
      </span>
    </div>
  );
};

export default Sort;
