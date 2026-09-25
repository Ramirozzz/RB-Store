// import Navbar from "../components/header/Navbar";
import { useState } from "react";
import Categories from "../components/categories/Categories";
import Hero from "../components/hero/Hero";
import ProductsList from "../components/products/ProductsList";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sort, setSort] = useState("");

  return (
    <>
      <Hero />
      <Categories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sort={sort}
        setSort={setSort}
      />
      <ProductsList selectedCategory={selectedCategory} sort={sort} />
    </>
  );
};

export default HomePage;
