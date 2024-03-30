import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const fetchProduct = (list, id) => {
    return list?.filter(item => item.id === id)[0];
}

const ProductPage = () => {
  const products = useSelector((state) => state.productReducer.products);
  const params = useParams();
  const id = params.id;
  const product = fetchProduct(products, id);
  console.log(product);

  return <div>PRODUCT DETAILS</div>;
};

export default ProductPage;
