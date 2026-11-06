import { Link } from "react-router-dom";
import { HiOutlinePlusCircle, HiOutlineFolderPlus } from "react-icons/hi2";
import useAuthStore from "../../../stores/authStore";
import LockedActions from "../demo/LockedActions";

const QuickActions = () => {
  const user = useAuthStore((state) => state.user);
  const demoUser = user?.role === "Demo";

  return (
    <section className="mt-8">
      <h2 className="text-lg">Quick Actions</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {demoUser ? (
          <div className="flex items-center gap-4 rounded-md bg-white border border-border p-4">
            <LockedActions className="w-full">
              <HiOutlinePlusCircle size={24} />

              <div className="pl-2">
                <p>Add Product</p>
                <p className="mt-1 text-sm text-muted">
                  Add a new product to your store.
                </p>
              </div>
            </LockedActions>
          </div>
        ) : (
          <Link
            to="/admin/products/new-product"
            className="flex items-center gap-4 rounded-md bg-white border border-border p-4 transition-colors hover:bg-bg"
          >
            <HiOutlinePlusCircle size={24} />
            <div>
              <p>Add Product</p>
              <p className="mt-1 text-sm text-muted">
                Add a new product to your store.
              </p>
            </div>
          </Link>
        )}

        {demoUser ? (
          <div className="flex items-center gap-4 rounded-md bg-white border border-border p-4">
            <LockedActions className="w-full">
              <HiOutlineFolderPlus size={24} />
              <div className="pl-2">
                <p>Add Category</p>
                <p className="mt-1 text-sm text-muted">
                  Create a new product category.
                </p>
              </div>
            </LockedActions>
          </div>
        ) : (
          <Link
            to="/admin/categories"
            className="flex items-center gap-4 rounded-md bg-white border border-border p-4 transition-colors hover:bg-bg"
          >
            <HiOutlineFolderPlus size={24} />
            <div>
              <p>Add Category</p>
              <p className="mt-1 text-sm text-muted">
                Create a new product category.
              </p>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
};

export default QuickActions;
