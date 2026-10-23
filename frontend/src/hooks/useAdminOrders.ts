import { useQuery } from "@tanstack/react-query";
import type { AdminOrder } from "../types/adminOrder";
import { getAdminOrders } from "../services/orderService";

export const useAdminOrders = () => {
  return useQuery<AdminOrder[]>({
    queryKey: ["adminOrders"],
    queryFn: getAdminOrders,
  });
};
