import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ErrorState from "../states/ErrorState";

interface ProductSliderProps {
  title: string;
  type: "bestSellers" | "newArrivals" | "related";
  categoryId?: number;
  excludeProductId?: number;
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  type,
  title,
  categoryId,
  excludeProductId,
}) => {
  const { data: products, isLoading, isError } = useProducts();

  let sliderProducts = products ?? [];

  if (type === "bestSellers") {
    sliderProducts = sliderProducts
      .filter((product) => product.isBestSeller)
      .slice(0, 6);
  }

  if (type === "newArrivals") {
    sliderProducts = [...sliderProducts]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 6);
  }

  if (type === "related") {
    sliderProducts = sliderProducts
      .filter(
        (product) =>
          product.categoryId === categoryId && product.id !== excludeProductId,
      )
      .slice(0, 6);
  }

  const prevClass = `product-slider-${type}-prev`;
  const nextClass = `product-slider-${type}-next`;

  //   const relatedProducts = products
  //   ?.filter(
  //     (product) =>
  //       product.categoryId === categoryId &&
  //       product.id !== excludeProductId,
  //   )
  //   .slice(0, 6);

  // const fallbackProducts = products
  //   ?.filter(
  //     (product) =>
  //       product.id !== excludeProductId &&
  //       !relatedProducts?.some((related) => related.id === product.id),
  //   )
  //   .slice(0, 6 - (relatedProducts?.length ?? 0));

  // const sliderProducts = [
  //   ...(relatedProducts ?? []),
  //   ...(fallbackProducts ?? []),
  // ];
  if (isError) {
    return <ErrorState message="Could not load products." />;
  }

  return (
    <div className="relative mb-4 py-4 pl-4 md:mb-8 lg:pl-16">
      <div className="mb-2 flex items-center justify-between pr-4 lg:pr-16">
        <h2 className="text-lg uppercase">{title}</h2>

        <div className="flex gap-2">
          <button
            type="button"
            className={`${prevClass} flex h-10 w-10 items-center justify-center border border-border`}
            aria-label="Previous products"
          >
            ←
          </button>

          <button
            type="button"
            className={`${nextClass} flex h-10 w-10 items-center justify-center border border-border`}
            aria-label="Next products"
          >
            →
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation, FreeMode]}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        grabCursor
        // freeMode={{
        //   enabled: true,
        //   momentum: true,
        //   momentumRatio: 1.35,
        //   momentumVelocityRatio: 1.2,
        //   momentumBounce: false,
        //   sticky: false,
        //   minimumVelocity: 0.02,
        // }}
        // touchRatio={1.2}
        // resistance
        // resistanceRatio={0.8}
        followFinger
        speed={600}
        // className="!w-auto"
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            slidesPerGroup: 1,
            spaceBetween: 8,
          },
          640: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 2,
            spaceBetween: 20,
          },
        }}
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide key={index}>
                <ProductCardSkeleton />
              </SwiperSlide>
            ))
          : sliderProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} showIsBestSeller={false} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
