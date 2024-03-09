import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchUserData, fetchUserDataCall } from "../features/user/userDetailsSlice";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useState(() => {
    const token = localStorage.getItem("token");
    if (token && !user.userData && !user.fetchUserDataCalled) {
      dispatch(fetchUserDataCall())
      dispatch(fetchUserData());
    }
  }, [user]);

  console.log(user);

  return (
    <div>
      {user.isLogged ? (
        JSON.stringify(user)
      ) : (
        "You are not logged in LOG IN TO CONTINUE"
      )}
    </div>
  );
};

export default HomePage;
