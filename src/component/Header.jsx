import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky bg-cyan-200 top-0 z-[20] mx-auto items-center justify-between border-gray-400 p-8">
      <h1 className="font-bold">SHOPX</h1>
      <>
        <NavLink to="/about">Products</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </>
    </header>
  );
};
