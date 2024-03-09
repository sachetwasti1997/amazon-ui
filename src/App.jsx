import { Route, Routes } from "react-router-dom";
import PaymentForm from "./component/PaymentForm";
import { useState } from "react";
import SignUpForm from "./container/SignUpForm";
import HomePage from "./container/HomePage";
import Orders from "./container/Orders";
import Profile from "./container/Profile";
import Nav from "./component/Nav";
import { useSelector } from "react-redux";

const App = () => {
  const isLogged = useSelector((state) => state.userReducer.isLogged);
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {!isLogged && <Route path="/signup" element={<SignUpForm />} />}
        {isLogged && (
          <>
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment/:id" element={<PaymentForm />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
