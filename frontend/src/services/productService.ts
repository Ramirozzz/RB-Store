import api from "./api";
import type { Product } from "../types/product";

export const getProducts = async (
  search?: string,
  sort?: string,
): Promise<Product[]> => {
  // await new Promise((resolve) => setTimeout(resolve, 1500));
  const res = await api.get<Product[]>("/products", {
    params: {
      search,
      sort,
    },
  });

  return res.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await api.get<Product>(`/products/${id}`);

  return res.data;
};
