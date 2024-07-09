import { useAuth } from "@/context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
const LogOut = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-black text-white rounded-xl px-4 py-2 "
      >
        Logout
      </button>
    </div>
  );
};

export default LogOut;
