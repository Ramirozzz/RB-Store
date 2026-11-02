import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useCreateCategory } from "../../hooks/useCreateCategory";
import { HiOutlinePlus } from "react-icons/hi2";
import ErrorState from "../../components/states/ErrorState";
import { useUpdateCategories } from "../../hooks/useUpdateCategories";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import LoadingSpinner from "../../components/LoadingSpinners/LoadingSpinner";
import { useDeleteCategory } from "../../hooks/useDeleteCategory";
import useToastStore from "../../stores/ToastStore";
import AdminCategoriesSkeleton from "../AdminSkeletons/AdminCategoriesSkeleton";
import DeleteConfirmationModal from "../components/modals/DeleteConfirmationModal";
import { useAdminSearchSort } from "../../hooks/useAdminSearchSort";
import AdminSearchBar from "../components/search/AdminSearchBar";
import Sort from "../components/sort/Sort";
import useAuthStore from "../../stores/authStore";
import LockedActions from "../components/demo/LockedActions";

const AdminCategoriesPage = () => {
  const { search, setSearch, debouncedSearch, sort, setSort } =
    useAdminSearchSort();
  const { data: categories, isLoading, isError } = useCategories();

  const filteredCategories = (categories ?? [])
    .filter((category) =>
      category.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sort) {
        case "name-asc":
          return a.name.localeCompare(b.name);

        case "name-desc":
          return b.name.localeCompare(a.name);

        default:
          return b.id - a.id;
      }
    });

  const categorySortOptions = [
    { label: "Name: A–Z", value: "name-asc" },
    { label: "Name: Z–A", value: "name-desc" },
  ];

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [deleteCategory, setDeleteCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const showToast = useToastStore((state) => state.showToast);

  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategories();
  const deleteCategoryMutation = useDeleteCategory();

  const handleCreateCategory = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    createCategoryMutation.mutate(
      {
        name,
      },
      {
        onSuccess: () => {
          showToast(" Category added successfully", "success");
          setName("");
          setShowForm(false);
        },
        onError: () => {
          showToast("Failed to add category.", "error");
        },
      },
    );
  };

  const handleUpdateCategory = (categoryId: number) => {
    updateCategoryMutation.mutate(
      {
        id: categoryId,
        category: {
          name: editName,
        },
      },
      {
        onSuccess: () => {
          showToast(" Category updated successfully", "success");
          setEditId(null);
          setEditName("");
        },
        onError: () => {
          showToast("Failed to update category.", "error");
        },
      },
    );
  };

  const handleDeleteCategory = () => {
    if (!deleteCategory) return;

    deleteCategoryMutation.mutate(deleteCategory.id, {
      onSuccess: () => {
        showToast("Category deleted successfully.", "success");
        setDeleteCategory(null);
      },
      onError: () => {
        showToast("Failed to delete category.", "error");
      },
    });
  };

  const user = useAuthStore((state) => state.user);
  const demoUser = user?.role === "Demo";

  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl">Categories</h1>

          <p className="mt-2 text-sm text-muted">
            Manage your product categories.
          </p>
        </div>
        {demoUser ? (
          <LockedActions className="bg-surface rounded-sm px-4 py-2.5 text-sm text-white">
            <span className="flex items-center gap-2">
              <HiOutlinePlus size={18} />
              Add Category
            </span>
          </LockedActions>
        ) : (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="flex cursor-pointer items-center gap-2 bg-surface px-4 py-2.5 text-sm rounded-sm text-white"
          >
            <HiOutlinePlus size={18} />
            Add Category
          </button>
        )}
      </div>
      {showForm && !demoUser && (
        <form
          onSubmit={handleCreateCategory}
          className="mt-6 max-w-full rounded-sm bg-white p-6 shadow-lg"
        >
          <label htmlFor="categoryName" className="mb-2 block text-sm">
            Category name
          </label>

          <input
            id="categoryName"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter category name"
            className="w-full border border-border rounded-sm px-4 py-2.5 text-[16px] outline-none"
            required
            maxLength={50}
          />

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setName("");
                setShowForm(false);
              }}
              className="cursor-pointer border border-border rounded-sm px-5 py-2 text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createCategoryMutation.isPending}
              className="cursor-pointer bg-surface px-5 py-2 rounded-sm text-sm text-white transition hover:bg-neutral-800"
            >
              {createCategoryMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner size={18} color="#ffffff" />
                  Saving...
                </span>
              ) : (
                "Add Category"
              )}
            </button>
          </div>
        </form>
      )}
      <div className="flex items-center justify-between gap-3 mt-6">
        <AdminSearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search categories"
        />
        <Sort
          sort={sort}
          onSort={setSort}
          options={categorySortOptions}
          ariaLabel="Sort categories"
        />
      </div>
      <div className="mt-6 rounded-lg bg-white shadow-lg">
        <p className="text-sm text-muted p-4 ">
          Total categories: {filteredCategories?.length ?? 0}
        </p>
        {isLoading ? (
          <AdminCategoriesSkeleton />
        ) : isError || !filteredCategories ? (
          <ErrorState message="Could not load categories." />
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm">
                <th className="px-5 py-4 text-text">Name</th>
                <th className="px-5 py-4 text-right text-text">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-5 py-8 text-center text-muted">
                    No categories found.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) =>
                  !demoUser && editId === category.id ? (
                    <tr
                      key={category.id}
                      className="border-b border-border last:border-0"
                    >
                      <td colSpan={2} className="px-5 py-4">
                        <form
                          onSubmit={(event) => {
                            event.preventDefault();
                            handleUpdateCategory(category.id);
                          }}
                          className="flex items-center gap-3"
                        >
                          <input
                            type="text"
                            value={editName}
                            onChange={(event) =>
                              setEditName(event.target.value)
                            }
                            className="border border-border px-3 py-2 text-sm outline-none"
                            maxLength={50}
                            required
                            disabled={updateCategoryMutation.isPending}
                          />

                          <button
                            type="submit"
                            disabled={updateCategoryMutation.isPending}
                            className="cursor-pointer text-sm disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {updateCategoryMutation.isPending
                              ? "Saving..."
                              : "Save"}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setEditId(null);
                              setEditName("");
                            }}
                            className="cursor-pointer text-sm text-muted"
                          >
                            Cancel
                          </button>
                        </form>
                      </td>
                    </tr>
                  ) : (
                    <tr
                      key={category.id}
                      className="border-b border-border last:border-0"
                    >
                      <td className="px-5 py-4 text-sm">{category.name}</td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end items-center gap-4">
                          {demoUser ? (
                            <>
                              <LockedActions icon>
                                <MdOutlineModeEdit
                                  size={20}
                                  className="text-muted"
                                />
                                <RiDeleteBin6Line
                                  size={20}
                                  className="text-muted"
                                />
                              </LockedActions>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditId(category.id);
                                  setEditName(category.name);
                                }}
                                className="cursor-pointer text-muted transition hover:text-text"
                                aria-label={`Edit category ${category.name}`}
                              >
                                <MdOutlineModeEdit
                                  size={20}
                                  aria-hidden="true"
                                />
                              </button>

                              <button
                                type="button"
                                className="cursor-pointer text-muted transition hover:text-red-600"
                                onClick={() =>
                                  setDeleteCategory({
                                    id: category.id,
                                    name: category.name,
                                  })
                                }
                                disabled={deleteCategoryMutation.isPending}
                                aria-label={`Delete category ${category.name}`}
                              >
                                <RiDeleteBin6Line
                                  size={20}
                                  aria-hidden="true"
                                />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ),
                )
              )}
            </tbody>
          </table>
        )}
      </div>
      {/* Modal opens when there is category saved in deleteCategory state */}
      <DeleteConfirmationModal
        isOpen={deleteCategory !== null}
        title="Delete category"
        message={`Are you sure you want to delete "${deleteCategory?.name}"? This action cannot be undone.`}
        isDeleting={deleteCategoryMutation.isPending}
        onDelete={handleDeleteCategory}
        onCancel={() => setDeleteCategory(null)}
      />
    </section>
  );
};

export default AdminCategoriesPage;
