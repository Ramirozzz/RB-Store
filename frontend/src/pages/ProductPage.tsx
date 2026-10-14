import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import ProductDetails from "../components/products/ProductDetails";
import ProductDetailsSkeleton from "../components/products/ProductDetailsSkeleton";
import ErrorState from "../components/states/ErrorState";

const ProductPage = () => {
  const { id } = useParams();
  const productId = Number(id);

  const { data: product, isLoading, isError } = useProduct(productId);

  return (
    <>
      {isLoading ? (
        <ProductDetailsSkeleton />
      ) : isError || !product ? (
        <ErrorState message="Could not load product." />
      ) : (
        <ProductDetails product={product} />
      )}
    </>
  );
};

export default ProductPage;
