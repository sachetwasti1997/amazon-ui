import { useEffect } from "react";
import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductCall, fetchProducts } from "../features/products/productsSlice";
import ProductCard from "./ProductCard";

const Home = ({ user }) => {
  const product = useSelector(state => state.productReducer.products);
  const isAllProductFetched = useSelector(state => state.productReducer.isAllProductFetched);
  const token = useSelector(state => state.userReducer.token);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("HERE");
    dispatch(fetchAllProductCall(true));
    if(!isAllProductFetched) {
      dispatch(fetchProducts({userId: user?.id, token}));
    }
  }, [user]);

  return (
    <>
      <div className="h-screen w-screen p-2">
        <div className="grid grid-cols-4 gap-2 mt-7">
          {product?.map((p) => (
            <ProductCard key={p.id} product={p}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
