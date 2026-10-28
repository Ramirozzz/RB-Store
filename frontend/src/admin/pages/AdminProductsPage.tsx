import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorState from "../../components/states/ErrorState";
import { HiOutlinePlus } from "react-icons/hi2";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import AdminProductsSkeleton from "../AdminSkeletons/AdminProductsSkeleton";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";
import useToastStore from "../../stores/ToastStore";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";
import { useAdminProducts } from "../../hooks/useAdminProducts";
import AdminSearchBar from "../components/search/AdminSearchBar";
import Sort from "../components/sort/Sort";
import { useAdminSearchSort } from "../../hooks/useAdminSearchSort";

const AdminProductsPage = () => {
  const { search, setSearch, debouncedSearch, sort, setSort } =
    useAdminSearchSort();

  const {
    data: products,
    isLoading,
    isError,
  } = useAdminProducts(debouncedSearch, sort);

  const productSortOptions = [
    { label: "Name: A–Z", value: "name-asc" },
    { label: "Name: Z–A", value: "name-desc" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
  ];

  const [deleteProduct, setDeleteProduct] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const deleteProductMutation = useDeleteProduct();

  const showToast = useToastStore((state) => state.showToast);

  const handleDeleteProduct = () => {
    if (!deleteProduct) return;

    deleteProductMutation.mutate(deleteProduct.id, {
      onSuccess: () => {
        showToast("Product deleted successfully.", "success");
        setDeleteProduct(null);
      },
      onError: () => {
        showToast("Failed to delete product.", "error");
      },
    });
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl ">Products</h1>

          <p className="mt-2 text-sm text-muted">Manage your store products.</p>
        </div>

        <Link
          to={"/admin/products/new-product"}
          type="button"
          className="flex cursor-pointer items-center gap-2 bg-surface rounded-sm px-4 py-2.5 text-sm text-white transition hover:bg-neutral-800"
        >
          <HiOutlinePlus size={18} />
          Add Product
        </Link>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-3 mt-6">
        <AdminSearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search products"
        />
        <Sort
          sort={sort}
          onSort={setSort}
          options={productSortOptions}
          ariaLabel="Sort products"
        />
      </div>

      <div className="mt-6 overflow-x-auto bg-white shadow-lg rounded-sm">
        <p className="text-sm text-muted p-4 font-normal ">
          <span className="text-text font-bold">Total products: </span>(
          {products?.length ?? 0})
        </p>
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
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-muted">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
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
                      className={`px-5 py-4 text-sm ${product.stockQuantity > 5 ? "text-text" : product.stockQuantity === 0 ? "text-red-600" : "text-amber-600"}`}
                    >
                      {product.stockQuantity}
                    </td>

                    <td className="px-5 py-4 text-sm">
                      {product.isBestSeller ? "Best Seller" : "—"}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-4">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="cursor-pointer text-muted transition hover:text-text"
                          aria-label={`Edit product ${product.name}`}
                        >
                          <MdOutlineModeEdit size={20} aria-hidden="true" />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteProduct({
                              id: product.id,
                              name: product.name,
                            })
                          }
                          disabled={deleteProductMutation.isPending}
                          className="cursor-pointer text-muted  transition hover:text-red-600"
                          aria-label={`Delete product ${product.name}`}
                        >
                          <RiDeleteBin6Line size={20} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal opens when there is a product saved in deleteProduct state */}
      <DeleteConfirmationModal
        isOpen={deleteProduct !== null}
        title="Delete product?"
        message={`Are you sure you want to delete "${deleteProduct?.name}"? This action cannot be undone.`}
        isDeleting={deleteProductMutation.isPending}
        onDelete={handleDeleteProduct}
        onCancel={() => setDeleteProduct(null)}
      />
    </section>
  );
};

export default AdminProductsPage;
