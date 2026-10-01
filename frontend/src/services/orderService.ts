import api from "./api";
import type { Order } from "../types/order";
import type { CreateOrder } from "../types/CreateOrder";

export const getOrders = async (): Promise<Order[]> => {
  const res = await api.get<Order[]>("/orders");

  return res.data;
};

export const createOrder = async (data: CreateOrder): Promise<Order> => {
  const res = await api.post<Order>("/orders", data);

  return res.data;
};
