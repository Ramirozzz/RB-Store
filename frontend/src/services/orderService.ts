import api from "./api";
import type { Order } from "../types/order";

export const getOrders = async (): Promise<Order[]> => {
  const res = await api.get<Order[]>("/orders");

  return res.data;
};
