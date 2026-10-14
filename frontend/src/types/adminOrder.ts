export type OrderStatus = 0 | 1 | 2;

export interface AdminOrder {
  id: number;
  orderDate: string;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
}
