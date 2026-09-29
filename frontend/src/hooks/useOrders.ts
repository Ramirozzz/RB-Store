import { useQuery } from "@tanstack/react-query";
import type { Order } from "../types/order";
import { getOrders } from "../services/orderService";

export const useOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};
