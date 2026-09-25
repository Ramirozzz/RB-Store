import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product";
import { getProducts } from "../services/productService";

export const useProducts = (search?: string, sort?: string) => {
  return useQuery<Product[]>({
    queryKey: ["products", { search, sort }],
    queryFn: () => getProducts(search, sort),
    placeholderData: (previousData) => previousData,
  });
};
