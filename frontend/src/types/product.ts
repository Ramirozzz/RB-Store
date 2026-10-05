import type { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stockQuantity: number;
  isBestSeller: boolean;
  createdAt: string;
  categoryId: number;
  category: Category;
}
