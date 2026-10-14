import { useQuery } from "@tanstack/react-query";
import type { AdminUser } from "../types/adminUser";
import { getAdminUsers } from "../services/userService";

export const useAdminUsers = () => {
  return useQuery<AdminUser[]>({
    queryKey: ["adminUsers"],
    queryFn: getAdminUsers,
  });
};
