import { useState } from "react";
import { Link } from "react-router-dom";
import type { CreateProduct } from "../../../types/product";
import { useCategories } from "../../../hooks/useCategories";
import LoadingSpinner from "../../../components/LoadingSpinners/LoadingSpinner";

interface AdminProductsFormProps {
  onSubmit: (product: CreateProduct) => void;
  isSubmitting?: boolean;
}

const AdminProductForm: React.FC<AdminProductsFormProps> = ({
  onSubmit,
  isSubmitting = false,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const { data: categories, isError } = useCategories();

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
        >
          <option value="">Select a category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {isError && (
          <p className="mt-2 text-sm text-red-700">
            Failed to load categories.
          </p>
        )}
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
              Adding Product...
            </span>
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
