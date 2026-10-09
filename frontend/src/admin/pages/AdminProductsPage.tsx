import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import ErrorState from "../../components/states/ErrorState";
import { HiOutlinePlus } from "react-icons/hi2";
// import LoadingSpinner from "../../components/LoadingSpinners/LoadingSpinner";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import AdminProductsSkeleton from "../AdminSkeletons/AdminProductsSkeleton";

const AdminProductsPage = () => {
  const { data: products, isLoading, isError } = useProducts();

  // if (isLoading) {
  //   return <AdminProductsSkeleton />;
  // }

  // if (isError || !products) {
  //   return <ErrorState message="Could not load products." />;
  // }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl ">Products</h1>

          <p className="mt-2 text-sm text-muted">Manage your store products.</p>
        </div>

        <Link
          to={"/admin/products/new-product"}
          type="button"
          className="flex cursor-pointer items-center gap-2 bg-surface px-4 py-2.5 text-sm text-white transition hover:bg-neutral-800"
        >
          <HiOutlinePlus size={18} />
          Add Product
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto bg-white shadow-lg">
        {isLoading ? (
          <AdminProductsSkeleton />
        ) : isError || !products ? (
          <ErrorState message="Could not load products." />
        ) : (
          <table className="w-full min-w-[700px] text-left">
            <thead className="border-b border-border">
              <tr>
                <th className="px-5 py-4 text-sm">Product</th>
                <th className="px-5 py-4 text-sm">Category</th>
                <th className="px-5 py-4 text-sm">Price</th>
                <th className="px-5 py-4 text-sm">Stock</th>
                <th className="px-5 py-4 text-sm">Status</th>
                <th className="px-5 py-4 text-sm">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border last:border-b-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-12 w-12 object-cover"
                      />

                      <span className="text-sm font-medium">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-muted">
                    {product.category.name}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {product.price.toFixed(2)} kr
                  </td>

                  <td
                    className={`px-5 py-4 text-sm ${product.stockQuantity > 5 ? "text-text" : "text-red-600"}`}
                  >
                    {product.stockQuantity}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {product.isBestSeller ? "Best Seller" : "—"}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex gap-4">
                      <button
                        type="button"
                        className="cursor-pointer text-muted"
                      >
                        <MdOutlineModeEdit size={20} />
                      </button>

                      <button
                        type="button"
                        className="cursor-pointer text-muted"
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AdminProductsPage;
