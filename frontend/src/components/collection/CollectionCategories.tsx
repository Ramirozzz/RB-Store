import classic from "../../assets/images/categories/classic.jpg";
import square from "../../assets/images/categories/square.jpg";
import round from "../../assets/images/categories/round.jpg";
import sport from "../../assets/images/categories/sport.jpg";
import aviator from "../../assets/images/categories/aviator.jpg";
import CategoryCard from "./CategoryCard";

const CollectionCategories = () => {
  return (
    <section className="px-4 py-16 sm:px-8 lg:px-10 xl:px-15">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
          Shop by style
        </p>

        <h2 className="mt-2 text-3xl font-bold uppercase tracking-tight text-text sm:text-4xl">
          Find your frame
        </h2>
      </div>
      <div className="grid gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <CategoryCard title="Classic" image={classic} categoryId={1} />
          <CategoryCard title="Round" image={round} categoryId={2} />
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <CategoryCard title="Square" image={square} categoryId={3} />
          <CategoryCard title="Sport" image={sport} categoryId={4} />
          <CategoryCard title="Aviator" image={aviator} categoryId={5} />
        </div>
      </div>
    </section>
  );
};

export default CollectionCategories;
