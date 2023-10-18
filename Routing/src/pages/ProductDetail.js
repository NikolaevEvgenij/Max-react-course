import { useParams } from "react-router-dom/cjs/react-router-dom";

const ProductDetail = () => {
   const products = useParams();

   return (
      <>
         <h1>Product Detail</h1>
         <p>{products.productId}</p>
      </>
   );
};

export default ProductDetail;
