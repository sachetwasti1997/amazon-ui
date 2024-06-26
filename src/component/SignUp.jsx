import axios from "axios";
import { useState } from "react";
import {
  API_BASE_PATH,
  COUNTRY_CODE,
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  PASSWORD,
  PHONE,
} from "../Constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../features/user/userDetailsSlice";

const SignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      setError("Please provide all the details!");
      return;
    }
    const signUpRequest = {
      firstName,
      lastName,
      email,
      password,
      countryCode,
      phone
    };
    axios
      .post(API_BASE_PATH + "/user/signup", signUpRequest)
      .then((res) => {
        const token = res.data;
        dispatch(setToken(token));
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    console.log(signUpRequest);
  };

  const inputChangeHandler = (event, eventName) => {
    setError(null);
    const value = event.target.value;
    switch (eventName) {
      case FIRST_NAME:
        setFirstName(value);
        break;
      case LAST_NAME:
        setLastName(value);
        break;
      case EMAIL:
        setEmail(value);
        break;
      case PASSWORD:
        setPassword(value);
        break;
      case COUNTRY_CODE:
        setCountryCode(value);
        break;
      case PHONE:
        setPhone(value);
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
          <h3 className="text-3xl font-semibold mb-4">SignUp</h3>
          <p className="text-base mb-2">
            Create an account! Please enter your details
          </p>
        </div>

        <div className="w-full flex flex-col">
          <div className="w-full flex">
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => inputChangeHandler(e, FIRST_NAME)}
              className="w-full text-black py-2 mr-1 my-2 bg-transparent border-b outline-none focus:outline-none"
            />

            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => inputChangeHandler(e, LAST_NAME)}
              className="w-full text-black py-2 ml-1 my-2 bg-transparent border-b outline-none focus:outline-none"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => inputChangeHandler(e, EMAIL)}
            className="w-full text-black py-2 my-2 bg-transparent border-b outline-none focus:outline-none"
          />

          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Ph Code"
              onChange={(e) => inputChangeHandler(e, COUNTRY_CODE)}
              className="w-1/3 text-black py-2 my-2 bg-transparent border-b outline-none focus:outline-none"
            />
            <input
              type="number"
              placeholder="Phone"
              onChange={(e) => inputChangeHandler(e, PHONE)}
              className="w-2/3 text-black py-2 my-2 bg-transparent border-b outline-none focus:outline-none"
            />
          </div>

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => inputChangeHandler(e, PASSWORD)}
            className="w-full text-black py-2 my-2 bg-transparent border-b outline-none focus:outline-none"
          />
        </div>

        <div className="w-full flex flex-col my-4">
          <button
            onClick={handleSignUp}
            className="w-full text-white my-2 font-semibold bg-black rounded-md p-4 text-center items-center justify-center"
          >
            Register
          </button>
          <button
            className="w-full text-black my-2 font-semibold bg-white border-2 border-black rounded-md p-4 text-center items-center justify-center"
            onClick={props.moveToSignUp}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
