import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../services/categoryService";
export const useUpdateCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      category,
    }: {
      id: number;
      category: { name: string };
    }) => updateCategory(id, category),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};
