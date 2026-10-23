import type { OrderStatus } from "../../types/adminOrder";

export const statuses: { value: OrderStatus; label: string }[] = [
  { value: 0 as unknown as OrderStatus, label: "Pending" },
  { value: 1 as unknown as OrderStatus, label: "Delivered" },
  { value: 2 as unknown as OrderStatus, label: "Cancelled" },
];

export const getStatusStyle = (status: OrderStatus) => {
  switch (status) {
    case 0:
      return "bg-amber-100 text-amber-800";
    case 1:
      return "bg-green-100 text-green-800";
    case 2:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
