import React, { useContext } from "react";
import { ThemeContext, UserContext } from "../App";

function ChildC() {
  const { user } = useContext(UserContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const handleTheme = () => {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="flex items-center justify-center h-52 w-52 border-2 border-gray-500"
        id="container"
        style={{ backgroundColor: theme === "light" ? "beige" : "grey" }}
      >
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleTheme}
        >
          Change theme
        </button>
      </div>
      <h1>Username: {user.name} </h1>
    </div>
  );
}

export default ChildC;
