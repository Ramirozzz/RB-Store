import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Categories from "../components/categories/Categories";
import ProductsList from "../components/products/ProductsList";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryUrl = searchParams.get("category");

  const selectedCategory = categoryUrl ? Number(categoryUrl) : null;

  const setSelectedCategory = (categoryId: number | null) => {
    if (categoryId === null) {
      setSearchParams({});
    } else {
      setSearchParams({ category: String(categoryId) });
    }
  };

  // const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sort, setSort] = useState("");

  return (
    <section className="pt-33 sm:pt-38">
      <div className="text-sm text-text px-4 sm:px-8 lg:px-10 xl:px-15  ">
        <div className="flex items-center gap-2">
          <Link to={"/"}>
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-accent">Shop</span>
        </div>

        <h1 className="mt-4 md:mt-8 text-3xl uppercase text-text sm:text-5xl">
          Our products
        </h1>
        <hr className="text-border mt-8 lg:mt-25" />
      </div>

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
