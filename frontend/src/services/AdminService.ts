import api from "./api";
import type { AdminDashboard } from "../types/adminDashboard";
import type { AdminOrder } from "../types/adminOrder";

export const getAdminDashboard = async (): Promise<AdminDashboard> => {
  const res = await api.get<AdminDashboard>("/admin/dashboard");

  return res.data;
};

export const getRecentOrders = async (): Promise<AdminOrder[]> => {
  const res = await api.get<AdminOrder[]>("/admin/orders/recent");

  return res.data;
};
