import { useEffect, useState } from "react";
import {
  COUNTRY_CODE,
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  PASSWORD,
  PHONE,
} from "../Constants";
import { useDispatch } from "react-redux";
import { updateUserData } from "../features/user/userDetailsSlice";

const UserEdit = ({ userData, submit, setSubmit }) => {
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(userData.password);
  const [countryCode, setCountryCode] = useState(userData.countryCode);
  const [phone, setPhone] = useState(userData.phone);
  const [passwordUpdate, setPasswordUpdate] = useState("NO");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSignUp = () => {
    if(!submit) return;
    const userDataSubmit = {
      id: userData.id,
      firstName: firstName,
      lastName: lastName,
      email: email ? email : userData.email,
      password: password ? password : userData.password,
      phone: phone ? phone : "",
      countryCode: countryCode ? countryCode : "",
    };
    dispatch(updateUserData({userDataSubmit, passwordUpdate}));
    setPasswordUpdate("NO");
    setSubmit(false);
  };

  useEffect(() => {
    handleSignUp();
  }, [submit]);

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
        setPasswordUpdate("YES");
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
    <div className="w-full flex flex-col">
      <div className="w-full flex">
        <input
          type="text"
          placeholder="First Name"
          defaultValue={userData.firstName}
          onChange={(e) => inputChangeHandler(e, FIRST_NAME)}
          className="w-full text-black py-2 mr-1 my-2 bg-transparent border-b outline-none focus:outline-none"
        />

        <input
          type="text"
          placeholder="Last Name"
          defaultValue={userData.lastName}
          onChange={(e) => inputChangeHandler(e, LAST_NAME)}
          className="w-full text-black py-2 ml-1 my-2 bg-transparent border-b outline-none focus:outline-none"
        />
      </div>

      <input
        type="email"
        placeholder="Email"
        defaultValue={userData.email}
        onChange={(e) => inputChangeHandler(e, EMAIL)}
        className="w-full text-black py-2 my-2 bg-transparent border-b outline-none focus:outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => inputChangeHandler(e, PASSWORD)}
        className="w-full text-black py-2 my-2 bg-transparent border-b outline-none focus:outline-none"
      />

      <div className="w-full flex">
        <div className="w-1/3">
          <input
            type="number"
            placeholder="Country Code"
            onChange={(e) => inputChangeHandler(e, COUNTRY_CODE)}
            className="w-full text-black py-2 mr-1 my-2 bg-transparent border-b outline-none focus:outline-none"
          />
        </div>

        <div className="w-2/3">
          <input
            type="number"
            placeholder="Phone"
            onChange={(e) => inputChangeHandler(e, PHONE)}
            className="w-full text-black py-2 ml-1 my-2 bg-transparent border-b outline-none focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
