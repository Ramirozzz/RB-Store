import { RiSortDesc } from "react-icons/ri";

interface SortOption {
  label: string;
  value: string;
}

interface SortProps {
  sort: string;
  onSort: (sort: string) => void;
  options: SortOption[];
  ariaLabel: string;
}

const Sort: React.FC<SortProps> = ({ sort, onSort, options, ariaLabel }) => {
  return (
    <div className="relative">
      <select
        value={sort}
        onChange={(e) => onSort(e.target.value)}
        className="appearance-none cursor-pointer rounded-sm border border-border bg-white py-2.5 pl-3 pr-10 text-sm focus:outline-none"
        aria-label={ariaLabel}
      >
        <option value="">
          <span className="text-muted">Sort By: </span> Latest
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <RiSortDesc size={18} />
      </span>
    </div>
  );
};

export default Sort;
