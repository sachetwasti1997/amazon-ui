import {
  COUNTRY_CODE,
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  PASSWORD,
  PHONE,
} from "../Constants";

const UserEdit = ({ userData }) => {
  const inputChangeHandler = (event, action) => {};
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex">
        <input
          type="text"
          placeholder="First Name"
          value={userData.firstName}
          onChange={(e) => inputChangeHandler(e, FIRST_NAME)}
          className="w-full text-black py-2 mr-1 my-2 bg-transparent border-b outline-none focus:outline-none"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={userData.lastName}
          onChange={(e) => inputChangeHandler(e, LAST_NAME)}
          className="w-full text-black py-2 ml-1 my-2 bg-transparent border-b outline-none focus:outline-none"
        />
      </div>

      <input
        type="email"
        placeholder="Email"
        value={userData.email}
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
