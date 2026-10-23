import useAuthStore from "../../../stores/authStore";
import { SlCalender } from "react-icons/sl";

const AdminHeader = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <div className="hidden lg:block border-b border-border px-8 py-5">
      <div className="flex items-center justify-between ">
        <span className="flex items-center gap-2 text-muted text-sm">
          <SlCalender />
          {today}
        </span>

        <div className="flex items-center gap-2 text-sm uppercase">
          <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-accent text-white">
            {user.name.slice(0, 1).toUpperCase()}
          </span>
          <span>{user.name} </span>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
