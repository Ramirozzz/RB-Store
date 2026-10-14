import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminOrderStatus } from "../services/orderService";
import type { OrderStatus } from "../types/adminOrder";

export const useUpdateAdminOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) =>
      updateAdminOrderStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminOrders"],
      });
    },
  });
};
