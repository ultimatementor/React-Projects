import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold hover:animate-pulse">
          Content Project
        </div>
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-slate-800 font-semibold text-xl"
                  : "text-white font-medium text-xl"
              } text-white hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-110`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-slate-800 font-semibold text-xl"
                  : "text-white font-medium text-xl"
              } text-white hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-110`
            }
          >
            Pastes
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-slate-800 font-semibold text-xl"
                  : "text-white font-medium text-xl"
              } text-white hover:text-red-500 transition duration-300 ease-in-out transform hover:scale-110`
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
