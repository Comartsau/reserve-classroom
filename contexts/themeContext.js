// contexts/ThemeContext.js
import React, { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    background: "white",
    text: "#000",
    fontSize: "16px", // สามารถเพิ่มคุณสมบัติอื่นๆ ที่ต้องการได้
    menuWidth: "170px", // เพิ่มคุณสมบัติความกว้างของเมนู
    // activeBackground :"#e6e6e6",
    // activeBackground :"#e6e6e6",
    activeBackground: "rgb(233 213 255)",
  });

  const changeTheme = (newTheme) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      ...newTheme,
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
