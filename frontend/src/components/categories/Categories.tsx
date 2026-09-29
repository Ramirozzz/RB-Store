import { useCategories } from "../../hooks/useCategories";
import Sort from "../sorting/Sort";
import CategoriesSkeleton from "./CategoriesSkeleton";
import { TbFaceIdError } from "react-icons/tb";

interface CategoriesProps {
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
  sort: string;
  setSort: (sort: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  selectedCategory,
  setSelectedCategory,
  sort,
  setSort,
}) => {
  const { data: categories, isLoading, isError } = useCategories();

  if (isError) {
    return (
      <div className="flex items-center gap-2 py-4 text-sm text-text mx-auto px-5 sm:px-8 lg:px-20 pt-20 ">
        <TbFaceIdError size={18} className="text-red-500" />
        <span>Could not load categories.</span>
      </div>
    );
  }

  return (
    <div className="mx-auto px-5 sm:px-8 lg:px-20 pt-20">
      {isLoading ? (
        <CategoriesSkeleton />
      ) : (
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap items-center gap-3 ">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`border px-5 py-3 text-xs font-bold transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-bg text-white"
                  : "border-border hover:bg-bg hover:text-white"
              }`}
            >
              All Products
            </button>
            {categories?.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`border px-5 py-3 text-xs font-bold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-bg text-white "
                    : "border-border hover:bg-bg hover:text-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div>
            <Sort sort={sort} onSort={setSort} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
