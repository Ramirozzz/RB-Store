import Hero from "../components/hero/Hero";
import CollectionCategories from "../components/collection/CollectionCategories";
import ProductSlider from "../components/products/ProductSlider";

const HomePage = () => {
  return (
    <>
      <Hero />
      <CollectionCategories />
      <ProductSlider type="bestSellers" title="Best Sellers" />
      <ProductSlider type="newArrivals" title="New Arrivals" />
    </>
  );
};

export default HomePage;
