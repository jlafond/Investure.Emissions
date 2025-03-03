import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type ThemeProviderProps = {
    children: React.ReactNode;
  };

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.remove("light-theme");
    } else {
      root.classList.add("light-theme");
    }
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider