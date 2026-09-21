import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product";
import { getProducts } from "../services/productService";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};
