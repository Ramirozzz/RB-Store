import api from "./api";
import type {
  Category,
  CreateCategory,
  UpdateCategory,
} from "../types/category";

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get<Category[]>("/categories");

  return res.data;
};

export const createCategory = async (
  category: CreateCategory,
): Promise<Category> => {
  const res = await api.post<Category>("/categories", category);

  return res.data;
};

export const updateCategory = async (
  id: number,
  category: UpdateCategory,
): Promise<Category> => {
  const res = await api.put<Category>(`/categories/${id}`, category);

  return res.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
