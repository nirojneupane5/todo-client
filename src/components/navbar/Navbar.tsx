import { NavLink, Outlet } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <header className="flex items-center px-2 py-4 bg-black text-white">
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
