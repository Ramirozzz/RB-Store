import { useSearchParams } from "react-router-dom";
import Categories from "../components/categories/Categories";
import ProductsList from "../components/products/ProductsList";
import PageHeader from "../components/pageHeader/PageHeader";
import { useAdminSearchSort } from "../hooks/useAdminSearchSort";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryUrl = searchParams.get("category");

  const selectedCategory = categoryUrl ? Number(categoryUrl) : null;
  const { sort, setSort } = useAdminSearchSort();

  // Updates the URL query parameter based on the selected category.
  const setSelectedCategory = (categoryId: number | null) => {
    if (categoryId === null) {
      setSearchParams({});
    } else {
      setSearchParams({ category: String(categoryId) });
    }
  };

  return (
    <section className="pt-33 sm:pt-38">
      <PageHeader
        title="Shop"
        description=" Modern eyewear designed for everyday style. "
      />

      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sort={sort}
        setSort={setSort}
      />
      <ProductsList selectedCategory={selectedCategory} sort={sort} />
    </section>
  );
};

export default ProductsPage;
