import api from "./api";
import type { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products");

  return res.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const res = await api.get<Product>(`/products/${id}`);

  return res.data;
};
