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
    <section className="md:mt-4 md:mt-0 py-8 bg-white rounded-sm md:shadow-lg px-6">
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
      </div>
    </section>
  );
};

export default AdminCreateProductPage;
