import { IoSearch } from "react-icons/io5";

interface AdminSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const AdminSearchBar: React.FC<AdminSearchBarProps> = ({
  value,
  onChange,
  placeholder = "search...",
}) => {
  return (
    <div className="flex w-full items-center gap-3 border border-border rounded-sm bg-white px-4 py-2.5 sm:max-w-sm">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        aria-label={placeholder}
      />
      <IoSearch size={20} className="shrink-0 text-muted" aria-hidden="true" />
    </div>
  );
};

export default AdminSearchBar;
