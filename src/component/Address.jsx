import axios from "axios";
import {
  ADDRESS_TYPE,
  EDIT_ADDRESS_ACTION,
  LINE_ONE,
  LINE_TWO,
  ZIP_CODE,
} from "../Constants";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUserAddress, editUserAddress } from "../features/user/userDetailsSlice";

const Address = ({ action, address, userId, submit, setSubmit }) => {
  const [lineOne, setLineOne] = useState(address?.lineOne);
  const [lineTwo, setLineTwo] = useState(address?.lineTwo);
  const [zipCode, setZipCode] = useState(address?.postalCode);
  const [primaryAddress, setPrimaryAddress] = useState(address?.primaryAddress);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!submit) {
      return;
    }
    console.log(submit);
    if (action === EDIT_ADDRESS_ACTION) {
      dispatch(editUserAddress({
        id: address.id,
        lineOne,
        lineTwo,
        primaryAddress,
        postalCode: zipCode,
      }));
    } else {
      dispatch(
        addUserAddress({
          lineOne,
          lineTwo,
          userId,
          primaryAddress,
          postalCode: zipCode,
        })
      );
    }
    setSubmit(false);
  };

  const inputChangeHandler = (event, eventName) => {
    setError(null);
    const value = event.target.value;
    switch (eventName) {
      case LINE_ONE:
        setLineOne(value);
        break;
      case LINE_TWO:
        setLineTwo(value);
        break;
      case ZIP_CODE:
        setZipCode(value);
        break;
      case ADDRESS_TYPE:
        setPrimaryAddress(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if(submit)handleSubmit();
  }, [submit]);

  return (
    <div className="w-full flex flex-col">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="text"
        placeholder="Address Line One"
        defaultValue={action === EDIT_ADDRESS_ACTION ? lineOne : ""}
        onChange={(e) => inputChangeHandler(e, LINE_ONE)}
        className="w-full text-black py-2 mr-1 my-2 bg-transparent border-b outline-none focus:outline-none"
      />

      <input
        type="text"
        placeholder="Address Line Two"
        defaultValue={action === EDIT_ADDRESS_ACTION ? lineTwo : ""}
        onChange={(e) => inputChangeHandler(e, LINE_TWO)}
        className="w-full text-black py-2 mr-1 my-2 bg-transparent border-b outline-none focus:outline-none"
      />

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Primary(YES/NO)"
          defaultValue={action === EDIT_ADDRESS_ACTION ? primaryAddress : ""}
          onChange={(e) => inputChangeHandler(e, ADDRESS_TYPE)}
          className="w-full text-black py-2 ml-1 my-2 bg-transparent border-b outline-none focus:outline-none"
        />
        <input
          type="number"
          placeholder="Zip Code"
          defaultValue={action === EDIT_ADDRESS_ACTION ? zipCode : ""}
          onChange={(e) => inputChangeHandler(e, ZIP_CODE)}
          className="w-full text-black py-2 ml-1 my-2 bg-transparent border-b outline-none focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Address;
