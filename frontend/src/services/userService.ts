import type { AdminUser } from "../types/adminUser";
import api from "./api";

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const res = await api.get<AdminUser[]>("/admin/users/");

  return res.data;
};
