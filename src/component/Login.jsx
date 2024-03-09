import { useState } from "react";
import { API_BASE_PATH, EMAIL, PASSWORD } from "../Constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide all the details!");
      return;
    }
    const request = {
      "userEmail" : email,
      "password" : password,
    };
    axios
      .post(API_BASE_PATH+"/user/login", request)
      .then((res) => {
        const token = res.data;
        localStorage.setItem("token", token);
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleChange = (event, eventName) => {
    const value = event.target.value;
    switch (eventName) {
      case EMAIL:
        setEmail(value);
        break;
      case PASSWORD:
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-2/3 h-full bg-white flex flex-col p-20 justify-center">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col">
          <h3 className="text-3xl font-semibold mb-4">Login</h3>
          <p className="text-base mb-2">
            Welcome Back! Please enter your details
          </p>
        </div>

        <div className="w-full flex flex-col">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => handleChange(e, EMAIL)}
            className="w-full text-black py-2 my-2 bg-transparent border-b outline-none focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange(e, PASSWORD)}
            className="w-full text-black py-2 my-2 bg-transparent border-b outline-none focus:outline-none"
          />
        </div>

        <div className="w-full flex flex-col my-4">
          <button
            onClick={login}
            className="w-full text-white my-2 font-semibold bg-black rounded-md p-4 text-center items-center justify-center"
          >
            Log In
          </button>
          <button
            className="w-full text-black my-2 font-semibold bg-white border-2 border-black rounded-md p-4 text-center items-center justify-center"
            onClick={props.moveToSignUp}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
