import { Link } from "react-router-dom";
import classic from "../../assets/images/categories/classic.jpg";
import square from "../../assets/images/categories/square.jpg";
import round from "../../assets/images/categories/round.jpg";
import sport from "../../assets/images/categories/sport.jpg";
import aviator from "../../assets/images/categories/aviator.jpg";

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
          <Link
            to="/shop?category=1"
            className="group relative overflow-hidden"
          >
            <img
              src={classic}
              alt="Classic eyewear"
              loading="lazy"
              className="h-100 w-full object-cover object-center sm:h-125"
            />

            <div className="absolute inset-0 flex items-end bg-black/10 p-5">
              <span className="text-sm font-bold uppercase tracking-wider text-white">
                Classic
              </span>
            </div>
          </Link>

          <Link
            to="/shop?category=2"
            className="group relative overflow-hidden"
          >
            <img
              src={round}
              alt="Round eyewear"
              loading="lazy"
              className="h-100 w-full object-cover object-center sm:h-125"
            />

            <div className="absolute inset-0 flex items-end bg-black/10 p-5">
              <span className="text-sm font-bold uppercase tracking-wider text-white">
                Round
              </span>
            </div>
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          {/* Square */}
          <Link
            to="/shop?category=3"
            className="group relative overflow-hidden"
          >
            <img
              src={square}
              alt="Square eyewear"
              loading="lazy"
              className="h-100 w-full object-cover object-center sm:h-125"
            />

            <div className="absolute inset-0 flex items-end bg-black/10 p-5">
              <span className="text-sm font-bold uppercase tracking-wider text-white">
                Square
              </span>
            </div>
          </Link>

          {/* Sport */}
          <Link
            to="/shop?category=4"
            className="group relative overflow-hidden"
          >
            <img
              src={sport}
              alt="Sport eyewear"
              loading="lazy"
              className="h-100 w-full object-cover object-center sm:h-125"
            />

            <div className="absolute inset-0 flex items-end bg-black/10 p-5">
              <span className="text-sm font-bold uppercase tracking-wider text-white">
                Sport
              </span>
            </div>
          </Link>

          {/* Aviator */}
          <Link
            to="/shop?category=5"
            className="group relative overflow-hidden"
          >
            <img
              src={aviator}
              alt="Aviator eyewear"
              loading="lazy"
              className="h-100 w-full object-cover object-center sm:h-125"
            />

            <div className="absolute inset-0 flex items-end bg-black/10 p-5">
              <span className="text-sm font-bold uppercase tracking-wider text-white">
                Aviator
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CollectionCategories;
