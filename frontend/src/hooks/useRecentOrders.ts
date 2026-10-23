import { useQuery } from "@tanstack/react-query";
import type { AdminOrder } from "../types/adminOrder";
import { getRecentOrders } from "../services/AdminService";

export const useRecentOrders = () => {
  return useQuery<AdminOrder[]>({
    queryKey: ["recent orders"],
    queryFn: getRecentOrders,
  });
};
