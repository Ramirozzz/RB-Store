import api from "./api";
import type { AdminDashboard } from "../types/AdminDashboard";

export const getAdminDashboard = async (): Promise<AdminDashboard> => {
  const res = await api.get<AdminDashboard>("/admin/dashboard");

  return res.data;
};
