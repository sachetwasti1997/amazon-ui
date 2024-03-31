import { MdOutlineBubbleChart } from "react-icons/md";
import { navLinks } from "../Constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDataCall, logOutUser } from "../features/user/userDetailsSlice";
import React, { useEffect, useState } from "react";
import { fetchAllProductCall, fetchMyProductCall } from "../features/products/productsSlice";
import { fetchMyOrderCall } from "../features/orders/ordersSlice";

const Nav = () => {
  const logged = useSelector((state) => state.userReducer.isLogged);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOutClicked = () => {
    localStorage.removeItem("token");
    navigate("/signup");
    // props.setSignUpPage(true);
    dispatch(logOutUser());
    dispatch(fetchUserDataCall(false));
    dispatch(fetchAllProductCall(false));
    dispatch(fetchMyProductCall(false));
    dispatch(fetchMyOrderCall(false));
  };

  const signInClicked = () => {
    // props.setSignUpPage(true);
    navigate("/signup");
  };

  const loggedInComponent = navLinks.map((link) => (
    <li key={link.id} className="md:ml-8">
      <Link
        to={link.value}
        className="text-gray-800 hover:text-gray-400 duration-750"
      >
        {link.name}
      </Link>
    </li>
  ));

  const signOutButton = (
    <button
      className="bg-indigo-700 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400"
      onClick={signOutClicked}
    >
      SignOut
    </button>
  );

  const signInButton = (
    <button
      className="bg-indigo-700 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400"
      onClick={signInClicked}
    >
      SignIn
    </button>
  );

  return (
    <div className={"shadow-md top-0 left-0 w-full mb-1"}>
      <div className="md:flex items-center justify-between bg-white py-2 md:px-7 px-5">
        <Link
          to={"/"}
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
        text-gray-800"
        >
          <MdOutlineBubbleChart className="mx-2" />
          SellIt.
        </Link>
        <ul className="flex items-center">
          {logged && (
            <>
              {loggedInComponent} {signOutButton}
            </>
          )}
          {!logged && signInButton}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
