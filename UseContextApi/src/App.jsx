import { createContext, useState } from "react";
import ChildA from "./components/ChildA";
import "./App.css";

const UserContext = createContext();
const ThemeContext = createContext();

function App() {
  const [user, setUser] = useState({ name: "Ali Haider" });
  const [theme, setTheme] = useState("light");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ChildA />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
export { UserContext };
export { ThemeContext };
