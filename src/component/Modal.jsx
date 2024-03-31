import { useState } from "react";
import { ADD_ADDRESS_ACTION, EDIT_ADDRESS_ACTION, MODAL_UPDATE_ACTION } from "../Constants";
import UserEdit from "./UserEdit";
import { useSelector } from "react-redux";
import Address from "./Address";

export default function Modal({
  showModal,
  setShowModal,
  modalAction,
  data,
}) {
  const [submit, setSubmit] = useState(false);
  const error = useSelector(state => state.userReducer.error)
  
  return (
    <>
      {showModal ? (
        <>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{modalAction}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="p-20">
                  {modalAction === MODAL_UPDATE_ACTION && (
                    <UserEdit
                      userData={data}
                      submit={submit}
                      setSubmit={setSubmit}
                    />
                  )}
                  {(modalAction === ADD_ADDRESS_ACTION ||
                    modalAction === EDIT_ADDRESS_ACTION) && (
                    <Address
                      action={modalAction}
                      submit={submit}
                      userId={data?.id}
                      address={data}
                      setSubmit={setSubmit}
                    />
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={() => {
                      setSubmit(true);
                      // setShowModal(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
