import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import ProductDetails from "../components/products/ProductDetails";

const ProductPage = () => {
  const { id } = useParams();
  const productId = Number(id);

  const { data: product, isError } = useProduct(productId);

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
