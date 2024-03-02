const Login = (props) => {
  return (
    <div className="w-1/2 h-full bg-white flex flex-col p-20 justify-center">
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
            className="w-full text-black py-2 my-2 bg-transparent border-b outline-none focus:outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full text-black py-2 my-2 bg-transparent border-b outline-none focus:outline-none"
          />
        </div>

        <div className="w-full flex flex-col my-4">
          <button className="w-full text-white my-2 font-semibold bg-black rounded-md p-4 text-center items-center justify-center">
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
