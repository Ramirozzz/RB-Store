import api from "./api";
import type { CreateProduct, Product } from "../types/product";

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

export const createProduct = async (
  product: CreateProduct,
): Promise<Product> => {
  const res = await api.post<Product>("/products", product);

  return res.data;
};

export const updateProduct = async (
  id: number,
  product: CreateProduct,
): Promise<void> => {
  await api.put(`/products/${id}`, product);
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`);
};
