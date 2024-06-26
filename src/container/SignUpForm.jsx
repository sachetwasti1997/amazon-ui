import { useEffect, useState } from "react";
import img from "../assets/logsign.jpg";
import Login from "../component/Login";
import SignUp from "../component/SignUp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [logInPage, setLogInPage] = useState(true);
  const isLogged = useSelector((state) => state.userReducer.isLogged);
  const navigate = useNavigate();

  const changePage = () => {
    setLogInPage(!logInPage);
  };

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[45%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-white font-bold my-4">
            Remove Hassel Selling Products Online
          </h1>
          <p className="text-xl text-white font-normal">
            Start for free and get attractive offers from the community
          </p>
        </div>
        <img src={img} className="w-full h-full object-cover" />
      </div>

      {logInPage ? (
        <Login moveToSignUp={changePage} />
      ) : (
        <SignUp moveToSignUp={changePage} />
      )}
    </div>
  );
};

export default SignUpForm;
