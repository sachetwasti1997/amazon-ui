import { useState } from "react";
import { EDIT_ADDRESS_ACTION } from "../Constants";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { deleteUserAddress } from "../features/user/userDetailsSlice";

const AddressCard = ({ address }) => {
  const [editAddress, setEditAddress] = useState(false);
  const dispatch = useDispatch();
  return (
    <div
      key={address?.id}
      className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow"
    >
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {address?.primaryAddress === "YES"
            ? "Primary Address"
            : "Secondary Address"}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700">
        {address?.lineOne}, {address?.lineTwo}, Pin: {address?.postalCode}
      </p>
      <div className="flex gap-2">
        <button
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => setEditAddress(true)}
        >
          Update Address
        </button>
        <button
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={(e) => {
            dispatch(deleteUserAddress(address.id));
          }}
        >
          Delete Address
        </button>
      </div>
      <Modal
        showModal={editAddress}
        setShowModal={setEditAddress}
        modalAction={EDIT_ADDRESS_ACTION}
        data={address}
      />
    </div>
  );
};

export default AddressCard;
