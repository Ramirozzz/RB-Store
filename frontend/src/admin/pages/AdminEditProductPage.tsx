import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";
import useToastStore from "../../stores/ToastStore";
import type { CreateProduct } from "../../types/product";
import AdminProductForm from "../components/forms/AdminProductForm";

const AdminEditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const productId = Number(id);

  const { data: product, isLoading, isError } = useProduct(productId);
  const updateProductMutation = useUpdateProduct();

  const showToast = useToastStore((state) => state.showToast);

  const handleUpdateProduct = (updatedProduct: CreateProduct) => {
    updateProductMutation.mutate(
      {
        id: productId,
        product: updatedProduct,
      },
      {
        onSuccess: () => {
          showToast("Product updated successfully.", "success");
          navigate("/admin/products");
        },
        onError: () => {
          showToast("Failed to update product.", "error");
        },
      },
    );
  };

  if (isLoading) {
    return <p>Loading product...</p>;
  }

  if (isError || !product) {
    return <p>Failed to load product.</p>;
  }

  return (
    <div className="mt-4 rounded-lg px-6 md:mt-0 md:bg-white md:py-8 md:shadow-lg">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl">Edit Product</h1>
        <p className="mt-2 text-sm text-muted">
          Update the product information.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-6xl bg-white">
        <AdminProductForm
          product={product}
          isEditting
          onSubmit={handleUpdateProduct}
          isSubmitting={updateProductMutation.isPending}
        />
      </div>
    </div>
  );
};

export default AdminEditProductPage;
