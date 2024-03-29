import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchUserData, fetchUserDataCall } from "../features/user/userDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import Home from "../component/Home";

const HomePage = (props) => {
  const fetchUserDataCalled = useSelector(
    (state) => state.userReducer.fetchUserDataCalled
  );
  const userData = useSelector(state => state.userReducer.userData);
  const isLogged = useSelector(state => state.userReducer.isLogged);
  const dispatch = useDispatch();

  console.log(userData);
  console.log(isLogged);

  return (
    <div>
      {isLogged && <Home user={userData}/>}
      {!isLogged && <p>You are not logged in please log in to continue!</p>}
      {/* <Home/> */}
    </div>
  );
};

export default HomePage;
