import { useEffect, useState } from "react";

export const useAdminSearchSort = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return {
    search,
    setSearch,
    debouncedSearch,
    sort,
    setSort,
  };
};
