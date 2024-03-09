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

  useState(() => {
    const token = localStorage.getItem("token");
    if (token && !userData && !fetchUserDataCalled) {
      dispatch(fetchUserDataCall(true))
      dispatch(fetchUserData());
    }
  }, []);

  return (
    <div>
      {isLogged ? (
        <Home user={userData}/>
      ) : (
        "You are not logged in LOG IN TO CONTINUE"
      )}
      {/* <Home/> */}
    </div>
  );
};

export default HomePage;
