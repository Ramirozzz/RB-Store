import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { CreateProduct, Product } from "../../../types/product";
import { useCategories } from "../../../hooks/useCategories";
import LoadingSpinner from "../../../components/LoadingSpinners/LoadingSpinner";
import ErrorState from "../../../components/states/ErrorState";

interface AdminProductsFormProps {
  onSubmit: (product: CreateProduct) => void;
  product?: Product;
  isSubmitting?: boolean;
  isEditting?: boolean;
}

const AdminProductForm: React.FC<AdminProductsFormProps> = ({
  onSubmit,
  product,
  isSubmitting = false,
  isEditting = false,
}) => {
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? "");
  const [stockQuantity, setStockQuantity] = useState(
    product ? String(product.stockQuantity) : "",
  );
  const [isBestSeller, setIsBestSeller] = useState(
    product?.isBestSeller ?? false,
  );
  const [categoryId, setCategoryId] = useState(
    product ? String(product.categoryId) : "",
  );

  const { data: categories, isLoading, isError } = useCategories();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      name,
      description,
      price: Number(price),
      imageUrl,
      stockQuantity: Number(stockQuantity),
      isBestSeller,
      categoryId: Number(categoryId),
    });
  };

  useEffect(() => {
    if (!product) return;

    setName(product.name);
    setDescription(product.description);
    setPrice(String(product.price));
    setImageUrl(product.imageUrl ?? "");
    setStockQuantity(String(product.stockQuantity));
    setIsBestSeller(product.isBestSeller);
    setCategoryId(String(product.categoryId));
  }, [product]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm">
          Product name
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-surface rounded-md"
          placeholder="Enter product name"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-sm">
          Description
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-32 w-full resize-y border border-border bg-white px-4 py-3 text-sm outline-none focus:border-surface rounded-md"
          placeholder="Write a description of the product"
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="mb-2 block text-sm">
            Price
          </label>

          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-surface rounded-md"
            placeholder="Enter product price"
            required
          />
        </div>

        <div>
          <label htmlFor="stockQuantity" className="mb-2 block text-sm">
            Stock quantity
          </label>

          <input
            id="stockQuantity"
            type="number"
            min="0"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-surface rounded-md"
            placeholder="Enter stock quantity"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="imageUrl" className="mb-2 block text-sm">
          Image URL
        </label>

        <input
          id="imageUrl"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="/images/products/product.jpg"
          className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-surface rounded-md"
        />
      </div>

      <div>
        <label htmlFor="categoryId" className="mb-2 block text-sm">
          Category
        </label>

        <select
          id="categoryId"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border border-border bg-white px-4 py-3 text-sm outline-none focus:border-surface rounded-md"
          required
          disabled={isLoading || isError}
        >
          <option value="">
            {isLoading
              ? "Loading categories..."
              : isError
                ? "Could not load categories"
                : "Select a category"}
          </option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <label className="flex cursor-pointer items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={isBestSeller}
          onChange={(e) => setIsBestSeller(e.target.checked)}
        />
        Best seller
      </label>
      <div className="flex items-center gap-4 mt-8">
        <button
          type="submit"
          className="cursor-pointer bg-surface px-5 py-3 text-sm text-white transition hover:bg-neutral-800"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <LoadingSpinner size={18} color="#ffffff" />
              {isEditting ? "Updating Product..." : "Adding Product..."}
            </span>
          ) : isEditting ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </button>
        <Link to={"/admin/products"}>
          <div className="cursor-pointer border border-border px-6 py-3 text-sm text-text transition hover:border-surface">
            <span> Go Back</span>
          </div>
        </Link>
      </div>
    </form>
  );
};

export default AdminProductForm;
