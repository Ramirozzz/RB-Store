import type { ReactNode } from "react";

interface AdminDashboardCardsProps {
  title: string;
  data: number;
  icon: ReactNode;
}

const AdminDashboardCard: React.FC<AdminDashboardCardsProps> = ({
  title,
  data,
  icon,
}) => {
  return (
    <div className="flex items-center gap-6 bg-white p-5 border border-border rounded-xl">
      <div className="bg-orange-50 p-3 rounded-full p-3">{icon}</div>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-text">{title}</p>
        <p className=" font-primary text-2xl">{data}</p>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
