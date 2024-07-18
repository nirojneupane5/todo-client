import Register from "./Register";
import Login from "./Login";
import useRouteStore from "@/store/useRoute";

const RegisterAndLogin = () => {
  const { route, selectedRoute } = useRouteStore();
  return (
    <div
      className="flex flex-col items-center h-screen"
      style={{
        background: "linear-gradient(to bottom right, #5761B2, #1FC5A8)",
      }}
    >
      <div className="my-5 text-white">
        <h1 className="text-xl font-bold capitalize">
          Welcome to Todo web appication{" "}
        </h1>
        <h2>Please Register or Login to Get Started</h2>
      </div>
      <div>
        <div className="flex items-center justify-center gap-10">
          <button
            onClick={() => selectedRoute("Register")}
            className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-700 duration-200 ease-in-out"
          >
            Register
          </button>
          <button
            onClick={() => selectedRoute("Login")}
            className="text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-700 duration-200 ease-in-out"
          >
            Login
          </button>
        </div>
        {route === "Register" ? <Register /> : <Login />}
      </div>
    </div>
  );
};

export default RegisterAndLogin;
