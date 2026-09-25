import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product";
import { getProductById } from "../services/productService";

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ["product", { id }],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};
