import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  fetchUserDataCall,
} from "../features/user/userDetailsSlice";
import imag from "../assets/profile-default.avif";
import Modal from "../component/Modal";
import { ADD_ADDRESS_ACTION, MODAL_UPDATE_ACTION } from "../Constants";
import AddressCard from "../component/AddressCard";

const Profile = () => {
  const userData = useSelector((state) => state.userReducer.userData);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const fetchUserDataCalled = useSelector(
    (state) => state.userReducer.fetchUserDataCalled
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !userData && !fetchUserDataCalled) {
      dispatch(fetchUserDataCall(true));
      dispatch(fetchUserData());
    }
  }, []);

  const addArr = userData?.addresses ? userData.addresses.slice().sort((a, b) => b.primaryAddress - a.primaryAddress) : [];

  return (
    <div className="m-16 bg-white border-solid border-cyan-950 rounded-lg text-gray-900">
      <div className="rounded-t-lg h-32 overflow-hidden">
        <img
          className="object-cover object-top w-full"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Mountain"
        />
      </div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img
          className="object-cover object-center h-32"
          src={userData?.profileImage ? userData.profileImage : imag}
          alt="Profile Image"
        />
      </div>
      <div className="text-center mt-2">
        <h2 className="font-semibold">
          {userData?.firstName} {userData?.lastName}
        </h2>
        <p className="text-gray-500">{userData?.email}</p>
        <p className="text-gray-500">
          {userData?.countryCode} {userData?.phone}
        </p>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setShowModal(true);
            setModalAction(MODAL_UPDATE_ACTION);
          }}
        >
          Update Profile
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setShowModal(true);
            setModalAction(ADD_ADDRESS_ACTION);
          }}
        >
          Add Address
        </button>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        modalAction={modalAction}
        data={userData}
      />
      <div className="grid grid-cols-4 gap-2 mt-7">
        {addArr.map((address) => (
          <AddressCard key={address?.id} address={address} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
