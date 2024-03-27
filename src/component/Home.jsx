import { useEffect } from "react";
import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import ProductCard from "./ProductCard";

const Home = ({ user }) => {
  const product = useSelector(state => state.productReducer.products);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("HERE");
    dispatch(fetchProducts(user?.id));
  }, [user]);

  console.log(product);
  return (
    <>
      <div className="h-screen w-screen bg-cyan-100 p-2">
        <p className="w-[100%]">{user?.email}</p>
        <div className="grid grid-cols-4 gap-2 mt-7">
          {product?.map((p) => (
            <ProductCard product={p}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
