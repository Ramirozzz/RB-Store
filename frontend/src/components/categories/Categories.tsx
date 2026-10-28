import { useCategories } from "../../hooks/useCategories";
import Sort from "../sorting/Sort";
import CategoriesSkeleton from "./CategoriesSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
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
    <div className="mx-auto px-4 pt-4 lg:pt-8 sm:px-8 lg:px-10 xl:px-15">
      {isLoading ? (
        <CategoriesSkeleton />
      ) : (
        <div className="flex flex-col gap-7 md:gap-5 md:flex-row md:items-center md:justify-between">
          <Swiper
            slidesPerView="auto"
            modules={[FreeMode]}
            grabCursor
            freeMode={{
              enabled: true,
              momentum: true,
              sticky: true,
            }}
            className="w-full"
            breakpoints={{
              320: {
                spaceBetween: 35,
              },
              640: {
                spaceBetween: 34,
              },
              1024: {
                spaceBetween: 35,
              },
            }}
          >
            <SwiperSlide className="!w-auto">
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className={`whitespace-nowrap text-base transition-all duration-100 ${
                  selectedCategory === null
                    ? "border-b-2 border-surface py-1"
                    : "py-1 hover:border-b-2 hover:border-surface"
                }`}
              >
                All Products
              </button>
            </SwiperSlide>

            {categories?.length === 0 ? (
              <p>No categories found</p>
            ) : (
              <>
                {categories?.map((category) => (
                  <SwiperSlide key={category.id} className="!w-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`whitespace-nowrap text-base text-text transition-all duration-100 ${
                        selectedCategory === category.id
                          ? "border-b-2 border-surface py-1"
                          : "py-1 hover:border-b-2 hover:border-surface"
                      }`}
                    >
                      {category.name}
                    </button>
                  </SwiperSlide>
                ))}
              </>
            )}
          </Swiper>

          <div className="shrink-0">
            <Sort sort={sort} onSort={setSort} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
