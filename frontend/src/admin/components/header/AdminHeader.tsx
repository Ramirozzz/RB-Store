import useAuthStore from "../../../stores/authStore";

const AdminHeader = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="hidden lg:block bg-white border-b border-border px-8 py-5.5">
      <div className="flex items-center justify-between ">
        <span>Welcome {user.name} </span>

        <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-accent text-sm text-white">
          {user.name.slice(0, 1).toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default AdminHeader;
