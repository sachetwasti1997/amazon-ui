import { useState } from "react";
import { Navigate } from "react-router-dom";
import SignUpForm from "../container/SignUpForm";

const HomePage = () => {
  const [isLogged, setIsUserLogged] = useState(false);

  useState(() => {
    const bearerToken = localStorage.getItem("token");
    console.log(bearerToken);
    if (!bearerToken) {
      setIsUserLogged(false);
    } else {
      setIsUserLogged(true);
    }
  }, []);

  return <div>{isLogged ? "" : <Navigate to={"/signup"} />}</div>;
};

export default HomePage;
