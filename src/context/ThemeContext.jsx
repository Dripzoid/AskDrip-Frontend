// src/context/ThemeContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext =
  createContext();

export function ThemeProvider({
  children,
}) {
  const [theme, setTheme] =
    useState("light");

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "theme"
      ) || "light";

    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(
    ThemeContext
  );
}