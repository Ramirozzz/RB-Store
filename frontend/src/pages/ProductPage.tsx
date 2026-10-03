import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import ProductDetails from "../components/products/ProductDetails";
import ProductDetailsSkeleton from "../components/products/ProductDetailsSkeleton";

const ProductPage = () => {
  const { id } = useParams();
  const productId = Number(id);

  const { data: product, isLoading, isError } = useProduct(productId);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (isError || !product) {
    return <div>Could not load product.</div>;
  }

  return (
    <>
      <ProductDetails product={product} />
    </>
  );
};

export default ProductPage;
