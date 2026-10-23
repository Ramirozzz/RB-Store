import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product";
import { getAdminProducts } from "../services/productService";

export const useAdminProducts = (search?: string, sort?: string) => {
  return useQuery<Product[]>({
    queryKey: ["adminProducts", { search, sort }],
    queryFn: () => getAdminProducts(search, sort),
    placeholderData: (previousData) => previousData,
  });
};
