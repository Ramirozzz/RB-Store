import type { Product } from "./product";

export interface OrderItem {
  id: number;
  productId: number;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  orderDate: string;
  totalPrice: number;
  userId: string;
  orderItems: OrderItem[];
}
