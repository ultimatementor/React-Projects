import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  themeMode: "light",
  darkTheme: () => {},
  lightTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;

export default function useTheme() {
  return useContext(ThemeContext);
}

/* data flow aise ho rha hai ke hum ne aik theme.js name ki file bnai hai jo ke aik global variable yani context ka kam krti hai Jab App.jsx render hota hai, to pehle UserContext.Provider apni value ko set karta hai.
Iske baad jitne components Provider ke under hain (jaise Header, Main, etc.), unko yeh value milti hai.
Jab koi child component render hota hai aur useContext se context ko access karta hai, to yeh data directly Provider se uthata hai.  */
