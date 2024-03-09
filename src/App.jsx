import { Route, Routes } from "react-router-dom";
import PaymentForm from "./component/PaymentForm";
import { useState } from "react";
import SignUpForm from "./container/SignUpForm";
import HomePage from "./container/HomePage";
import Orders from "./container/Orders";
import Profile from "./container/Profile";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment/:id" element={<PaymentForm/>}/>
      </Routes>
    </div>
  );
};

export default App;
