import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchUserData, fetchUserDataCall } from "../features/user/userDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import Home from "../component/Home";

const HomePage = (props) => {
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useState(() => {
    const token = localStorage.getItem("token");
    if (token && !user.userData && !user.fetchUserDataCalled) {
      dispatch(fetchUserDataCall())
      dispatch(fetchUserData());
    }
  }, []);

  return (
    <div>
      {user.isLogged ? (
        <Home user={user}/>
      ) : (
        "You are not logged in LOG IN TO CONTINUE"
      )}
      {/* <Home/> */}
    </div>
  );
};

export default HomePage;
