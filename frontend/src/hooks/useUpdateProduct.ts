import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateProduct } from "../types/product";
import { updateProduct } from "../services/productService";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: CreateProduct }) =>
      updateProduct(id, product),

    onSuccess: (_, updatedProduct) => {
      queryClient.invalidateQueries({
        queryKey: ["adminProducts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["product", { id: updatedProduct.id }],
      });
    },
  });
};
