import { createSlice } from "@reduxjs/toolkit";

type ThemeState = {
  theme: "light" | "dark";
};

const loadThemeFromLocalStorage = (): ThemeState => {
    const savedTheme = localStorage.getItem("theme");
    return {
      theme: (savedTheme as "light" | "dark") || "dark",
    };
  };

const saveThemeToLocalStorage = (theme: "light" | "dark") => {
    localStorage.setItem("theme", theme);
};

const initialState: ThemeState = loadThemeFromLocalStorage();

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
      saveThemeToLocalStorage(state.theme);
    },
  },
});

export const { toggleTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;