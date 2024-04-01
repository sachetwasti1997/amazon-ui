import { useDispatch, useSelector } from "react-redux";
import AddProduct from "../component/AddProduct";
import ProductCard from '../component/ProductCard';
import { useEffect, useState } from "react";
import { fetchMyProductCall, fetchUserProducts } from "../features/products/productsSlice";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const myProducts = useSelector((state) => state.productReducer.myProducts);
  const token = useSelector((state) => state.userReducer.token);
  const userData = useSelector((state) => state.userReducer.userData);
  const navigate = useNavigate();

  const fetchCalled = useSelector(
    (state) => state.productReducer.myProductFetched
  );
  const dispatch = useDispatch();

  const navigateAddProduct = () => {
    navigate("/product/add");
  }

  useEffect(() => {
    if (!fetchCalled) {
      dispatch(fetchMyProductCall(true));
      dispatch(fetchUserProducts({ userId: userData.id, token }));
    }
  }, []);
  return (
    <div className="m-10 bg-white border-solid border-cyan-950 rounded-lg text-gray-900">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={navigateAddProduct}
      >
        Add Product
      </button>
      <div className="grid grid-cols-4 gap-2 mt-7">
        {myProducts?.map((p) => (
          <ProductCard
            onEditSelect={() => navigate(`/product/edit/${p.id}`)}
            isEditAction={true}
            key={p.id}
            product={p}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
