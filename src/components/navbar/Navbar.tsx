import { Outlet } from "react-router-dom";
import CustomLink from "./CustomLink";
const Navbar = () => {
  return (
    <>
      <header className="flex justify-center items-center px-2 py-4 bg-black text-white ">
        <nav className="flex justify-center items-center gap-5">
          <CustomLink title="home" path="/home" />
          <CustomLink title="about" path="/about" />
          <CustomLink title="user" path="/user" />
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
