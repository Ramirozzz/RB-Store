import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../services/orderService";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  });
};
