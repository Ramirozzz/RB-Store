import api from "./api";
import type { Order } from "../types/order";

import type { AdminOrder, OrderStatus } from "../types/adminOrder";
import type { CreateOrder } from "../types/createOrder";

export const getOrders = async (): Promise<Order[]> => {
  const res = await api.get<Order[]>("/orders");

  return res.data;
};

export const getAdminOrders = async (): Promise<AdminOrder[]> => {
  const res = await api.get<AdminOrder[]>("/admin/orders");

  return res.data;
};

export const createOrder = async (data: CreateOrder): Promise<Order> => {
  const res = await api.post<Order>("/orders", data);

  return res.data;
};

export const updateAdminOrderStatus = async (
  id: number,
  status: OrderStatus,
): Promise<void> => {
  await api.put(`/admin/orders/${id}/status`, {
    status,
  });
};
