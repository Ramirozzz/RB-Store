import { useCategories } from "../../hooks/useCategories";
import CategoriesSkeleton from "./CategoriesSkeleton";

interface CategoriesProps {
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const { data: categories, isLoading, isError } = useCategories();

  if (isError) {
    return <p>Could not load categories.</p>;
  }

  if (!categories) return null;

  return (
    <div className="pt-20">
      {isLoading ? (
        <CategoriesSkeleton />
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-3 px-5">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`border border-border px-5 py-2 text-xs uppercase transition ${
              selectedCategory === null
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`border border-border px-5 py-2 text-xs uppercase transition ${
                selectedCategory === category.id
                  ? "bg-black text-white"
                  : "hover:bg-black hover:text-white"
              }`}
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
