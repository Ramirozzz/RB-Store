import { Link } from "react-router-dom";
import { HiOutlinePlusCircle, HiOutlineFolderPlus } from "react-icons/hi2";

const QuickActions = () => {
  return (
    <section className="mt-8">
      <h2 className="text-lg">Quick Actions</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Link
          to="/admin/products/new-product"
          className="flex items-center gap-3 rounded-xl bg-white border border-border p-4 transition-colors hover:bg-bg"
        >
          <HiOutlinePlusCircle size={24} />
          <div>
            <p>Add Product</p>
            <p className="mt-1 text-sm text-muted">
              Add a new product to your store.
            </p>
          </div>
        </Link>

        <Link
          to="/admin/categories/categories"
          className="flex items-center gap-3 rounded-xl bg-white border border-border p-4 transition-colors hover:bg-bg"
        >
          <HiOutlineFolderPlus size={24} />
          <div>
            <p>Add Category</p>
            <p className="mt-1 text-sm text-muted">
              Create a new product category.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default QuickActions;
