import { Route, Routes } from "react-router-dom";
import PaymentForm from "./component/PaymentForm";
import { useEffect, useState } from "react";
import SignUpForm from "./container/SignUpForm";
import HomePage from "./container/HomePage";
import Orders from "./container/Orders";
import Profile from "./container/Profile";
import Nav from "./component/Nav";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, fetchUserDataCall, setToken } from "./features/user/userDetailsSlice";
import Products from "./container/Products";
import AddProduct from "./component/AddProduct";
import ProductDetails from "./container/ProductDetails";
import OrderDetails from "./container/OrderPage";

const App = () => {
  const isLogged = useSelector((state) => state.userReducer.isLogged);
  const token = useSelector((state) => state.userReducer.token);
  const userData = useSelector((state) => state.userReducer.userData);
  const fetchUserDataCalled = useSelector(
    (state) => state.userReducer.fetchUserDataCalled
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token)
      dispatch(setToken(token));
  }, []);

  useEffect(() => {
    const tokenR = token ? token : localStorage.getItem("token");
    if (tokenR && !userData && !fetchUserDataCalled) {
      dispatch(fetchUserDataCall(true));
      dispatch(fetchUserData());
    }
  }, [token]);

  const routes = (
        <>
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<OrderDetails/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment/:id" element={<PaymentForm />} />
          <Route path="/product" element={<Products/>}/>
          <Route path="/product/:id" element={<ProductDetails/>}/>
          <Route path="/product/add" element={<AddProduct/>}/>
        </>
  );

  const routesNotLogged = (
      <Route path="/signup" element={<SignUpForm />} />
  );

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {isLogged && routes}
        {!isLogged && routesNotLogged}
      </Routes>
    </div>
  );
};

export default App;
