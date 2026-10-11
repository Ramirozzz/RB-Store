import { useQuery } from "@tanstack/react-query";
import type { Category } from "../types/category";
import { getCategories } from "../services/categoryService";

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
