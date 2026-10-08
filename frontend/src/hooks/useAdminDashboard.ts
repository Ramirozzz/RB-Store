import { useQuery } from "@tanstack/react-query";
import type { AdminDashboard } from "../types/AdminDashboard";
import { getAdminDashboard } from "../services/AdminService";

export const useAdminDashboard = () => {
  return useQuery<AdminDashboard>({
    queryKey: ["admin dashboard"],
    queryFn: getAdminDashboard,
  });
};
