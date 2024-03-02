import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SignUpForm from "../container/SignUpForm";
import axios from "axios";
import { API_BASE_PATH } from "../Constants";

const HomePage = () => {
  const [isLogged, setIsUserLogged] = useState(false);
  const [userData, setUserData] = useState({});

  const getUser = (token) => {
    console.log(token);
    axios
      .get(API_BASE_PATH + "/user/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        setIsUserLogged(false);
      });
  };

  useState(() => {
    const bearerToken = localStorage.getItem("token");
    console.log(bearerToken);
    if (!bearerToken) {
      setIsUserLogged(false);
    } else {
      setIsUserLogged(true);
      getUser(bearerToken);
    }
  }, []);

  return (
    <div>
      {isLogged ? JSON.stringify(userData) : <Navigate to={"/signup"} />}
    </div>
  );
};

export default HomePage;
