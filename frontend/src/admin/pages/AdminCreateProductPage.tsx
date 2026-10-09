import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "../../hooks/useCreateProduct";
import type { CreateProduct } from "../../types/product";
import AdminProductForm from "../components/forms/AdminProductForm";
import useToastStore from "../../stores/ToastStore";

const AdminCreateProductPage = () => {
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct();

  const showToast = useToastStore((state) => state.showToast);

  const handleCreateProduct = (product: CreateProduct) => {
    createProductMutation.mutate(product, {
      onSuccess: () => {
        showToast(" Product added successfully", "success");
        navigate("/admin/products");
      },
      onError: () => {
        showToast("Failed to add product", "error");
      },
    });
  };

  return (
    <div className="mt-4 md:mt-0 md:py-8 md:bg-white md:shadow-lg rounded-lg px-6">
      <div className="mx-auto max-w-6xl  ">
        <h1 className="text-2xl">Add New Product</h1>

        <p className="mt-2 text-sm text-muted">
          Create a new product for your store.
        </p>
      </div>

      <div className=" mt-12 max-w-6xl mx-auto bg-white ">
        <AdminProductForm
          onSubmit={handleCreateProduct}
          isSubmitting={createProductMutation.isPending}
        />
        {/* {createProductMutation.isError && (
          <p className="flex items-center gap-2 mt-4 text-sm text-red-700">
            <TbFaceIdError size={22} /> Failed to create product.
          </p>
        )} */}
      </div>
    </div>
  );
};

export default AdminCreateProductPage;
