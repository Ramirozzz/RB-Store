import { useCategories } from "../../hooks/useCategories";
import CategoriesSkeleton from "./CategoriesSkeleton";

const Categories = () => {
  const { data: categories, isLoading, isError } = useCategories();

  if (isError) {
    return <p>Could not load categories.</p>;
  }

  return (
    <div className="pt-20">
      {isLoading ? (
        <CategoriesSkeleton />
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-3 px-5">
          {categories?.map((category) => (
            <button
              key={category.id}
              className="border border-border px-5 py-2 text-xs uppercase transition hover:bg-black hover:text-white"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
