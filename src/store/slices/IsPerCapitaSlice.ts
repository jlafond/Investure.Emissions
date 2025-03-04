import { createSlice } from "@reduxjs/toolkit";

type IsPerCapitaState = {
  isPerCapita: boolean;
};

const initialState: IsPerCapitaState = {
    isPerCapita: false
};

export const IsPerCapitaSlice = createSlice({
  name: "percapita",
  initialState,
  reducers: {
    togglePerCapita(state) {
      state.isPerCapita = !state.isPerCapita;
    },
  },
});

export const { togglePerCapita } = IsPerCapitaSlice.actions;
export default IsPerCapitaSlice.reducer;