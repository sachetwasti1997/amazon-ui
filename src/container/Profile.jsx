import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  fetchUserDataCall,
} from "../features/user/userDetailsSlice";
import imag from "../assets/profile-default.avif";
import Modal from "../component/Modal";
import { ADD_ADDRESS_ACTION, MODAL_UPDATE_ACTION } from "../Constants";

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
    console.log(token);
    console.log(fetchUserDataCalled);
    console.log(userData);
    if (token && !userData && !fetchUserDataCalled) {
      dispatch(fetchUserDataCall(true));
      dispatch(fetchUserData());
    }
  }, []);

  return (
    <div class="m-16 bg-white border-solid border-cyan-950 rounded-lg text-gray-900">
      <div class="rounded-t-lg h-32 overflow-hidden">
        <img
          class="object-cover object-top w-full"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Mountain"
        />
      </div>
      <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img
          class="object-cover object-center h-32"
          src={userData?.profileImage ? userData.profileImage : imag}
          alt="Profile Image"
        />
      </div>
      <div class="text-center mt-2">
        <h2 class="font-semibold">
          {userData?.firstName} {userData?.lastName}
        </h2>
        <p class="text-gray-500">{userData?.email}</p>
        <p class="text-gray-500">
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
        userData={userData}
      />
    </div>
  );
};

export default Profile;
