import ProductsList from "../components/products/ProductsList";
import PageHeader from "../components/pageHeader/PageHeader";

const BestSellersPage = () => {
  return (
    <section className="pt-33 sm:pt-38">
      <PageHeader title="Bestsellers" description="Our most popular frames." />

      <ProductsList bestSellers />
    </section>
  );
};

export default BestSellersPage;
